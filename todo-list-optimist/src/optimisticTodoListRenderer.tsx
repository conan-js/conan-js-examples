import * as React from "react";
import {ReactElement} from "react";
import {ConnectedState} from "conan-js-core";
import {TodoListActions} from "./state/todoListSync.state";
import {ToDo, ToDoStatus, VisibilityFilters} from "./domain/domain";
import {OptimisticData, OptimisticTodoListData} from "./domain";
import {FooterRenderer} from "./renderers/todoList.renderer";
import {AddTodo} from "./renderers/addTodo.renderer";
import {OptimisticTodo} from "./optimisticTodo.renderer";


export function OptimisticTodoListRenderer({data, actions}: ConnectedState<OptimisticTodoListData, TodoListActions>): ReactElement {
    return (
        <>
            <div className="Index">
                <AddTodo onClick={actions.addTodo}/>
                <ul>
                    {filterToDos(data.todos, data.appliedFilter).map(todo =>
                    <OptimisticTodo
                        key={todo.data.id}
                        id={todo.data.id}
                        toggleCb={() => actions.toggleTodo(todo.data)}
                        text={todo.data.description}
                        completed={todo.data.status === ToDoStatus.COMPLETED}
                        status={todo.status}
                        cancelCb={todo.cancelCb}
                    />
                )}
            </ul>
            <FooterRenderer appliedFilter={data.appliedFilter} filterUpdater={actions.filter}/>
        </div>
        </>
    );
}


export function filterToDos(todos: OptimisticData<ToDo>[], filter: VisibilityFilters): OptimisticData<ToDo>[] {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.data.status === ToDoStatus.COMPLETED);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => t.data.status === ToDoStatus.PENDING);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}
