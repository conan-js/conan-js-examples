import {TodoListActions, TodoListData, TodoListStateMachineFactory} from "../todoList.sm";
import * as React from "react";
import {ReactElement} from "react";
import {ToDo, ToDoStatus} from "../domain/domain";
import {ICallback, IConsumer} from "../../../../conan-ui-core/src/lib/conan-utils/typesHelper";

interface TodoListContainerState {
    actions: TodoListActions;
    data: TodoListData;
}

export class TodoListContainer extends React.Component<{}, TodoListContainerState> {

    private stateMachine = TodoListStateMachineFactory({
        appliedFilter: undefined,
        todos: []
    }).addListener([`::nextToDoList->render`, {
        onNextTodoList: (actions, params) => this.setState({
            actions,
            data: params.sm.getState()
        })
    }]);

    componentDidMount(): void {
        this.stateMachine.start('todo-list-state-machine');
    }

    render(): ReactElement {
        if (this.state == null) return null;

        return <div className="App">
            <TodoList
                todos={this.state.data.todos}
                toggleTodo={this.state.actions.toggleTodo}/>
            <AddTodo onClick={this.state.actions.addTodo}/>
        </div>;
    }
}


const TodoList = ({todos, toggleTodo}: { todos: ToDo[], toggleTodo: IConsumer<string> }): ReactElement => <ul>
    {todos.map(todo =>
        <Todo
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            text={todo.description}
            completed={todo.status === ToDoStatus.COMPLETED}
        />
    )}
</ul>;

const Todo = ({onClick, completed, text}: { onClick: ICallback, completed: boolean, text: string }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

let nextTodoId = 0;
let AddTodo = ({onClick}: { onClick: IConsumer<ToDo> }) => {
    let input: HTMLInputElement;

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    onClick(
                        {
                            id: String(nextTodoId++),
                            description: input.value,
                            status: ToDoStatus.PENDING,
                        }
                    );
                    input.value = ''
                }}
            >
                <input
                    ref={node => {
                        input = node
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
