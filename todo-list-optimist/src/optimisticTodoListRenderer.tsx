import * as React from "react";
import {ReactElement} from "react";
import {ConnectedState} from "conan-js-core";
import {TodoListActions} from "./state/todoListSync.state";
import {ToDo, ToDoStatus, VisibilityFilters} from "./domain/domain";
import {OptimisticData, OptimisticTodoListData} from "./domain";
import {FooterRenderer} from "./renderers/todoList.renderer";
import {AddTodo} from "./renderers/addTodo.renderer";
import {OptimisticTodo} from "./optimisticTodo.renderer";
import {Grid} from "@material-ui/core";


export function OptimisticTodoListRenderer({data, actions}: ConnectedState<OptimisticTodoListData, TodoListActions>): ReactElement {
    return (
        <>
            <Grid container spacing={1} direction={"column"}>
                <Grid item xs={12} lg={4}>
                    <AddTodo onClick={actions.addTodo}/>
                </Grid>
                <Grid item xs={12} lg={4}>
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
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FooterRenderer appliedFilter={data.appliedFilter} filterUpdater={actions.filter}/>
                </Grid>
            </Grid>
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
