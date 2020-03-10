import {TodoListActions, TodoListData, TodoListStoreFactory} from "./todoList.sm";
import * as React from "react";
import {ReactElement} from "react";
import {ToDo, ToDoStatus} from "./domain";
import {ICallback, IConsumer} from "../lib/conan-utils/typesHelper";

interface TodoListContainerState {
    actions: TodoListActions;
    data: TodoListData;
}

export class TodoListContainer extends React.Component<{}, TodoListContainerState>{
    componentDidMount(): void {
        TodoListStoreFactory ({
            appliedFilter: undefined,
            todos: [{
                status: ToDoStatus.PENDING,
                description: 'test',
                id: '1'
            }]
        }).addListener([`::nextToDoList->render`, {
            onNextTodoList: (actions, params) => this.setState({
                actions,
                data: params.sm.getState()
            })
        }]).start('todo-list-container')
    }

    render (): ReactElement{
        if (this.state == null) return null;

        return <TodoList
            todos={this.state.data.todos}
            toggleTodo={this.state.actions.toggleTodo}
        />;
    }
}


const TodoList = ({ todos, toggleTodo }: {todos: ToDo[], toggleTodo: IConsumer<string>}): ReactElement => <ul>
    {todos.map(todo =>
        <Todo
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            text={todo.description}
            completed={todo.status === ToDoStatus.COMPLETED}
        />
    )}
</ul>;

const Todo = ({ onClick, completed, text }: {onClick: ICallback, completed: boolean, text: string}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
);
