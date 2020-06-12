import {TodoListReducers, TodoListReducersFn} from "./todoList.reducers";
import {ToDo, TodoListData, VisibilityFilters} from "../domain/domain";
import {ConanState} from "conan-js-core";
import {Conan} from "conan-js-core";
import {Asap} from "conan-js-core";

export type TodoListState = ConanState<TodoListData, TodoListActions>;


export interface TodoListActions {
    addTodo(todo: ToDo): Asap<TodoListData>;

    toggleTodo(todo: ToDo): Asap<TodoListData>;

    filter (filter: VisibilityFilters): Asap<TodoListData>;
}


export const todoListSyncState$: TodoListState  = Conan.state<TodoListData, TodoListReducers, TodoListActions>({
    name: 'todos-sync',
    initialData: {
        appliedFilter: VisibilityFilters.SHOW_ALL,
        todos: []
    },
    reducers: TodoListReducersFn,
});
