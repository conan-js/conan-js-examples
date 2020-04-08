import { ToDo, VisibilityFilters } from "../domain/domain";
import { Store } from "conan-ui-core";
export interface TodoListData {
    todos: ToDo[];
    appliedFilter: VisibilityFilters;
}
export interface TodoListActions {
    toggleTodo(todoId: string): TodoListData;
    addTodo(todo: ToDo): TodoListData;
    filter(filter: VisibilityFilters): TodoListData;
}
export declare let TodoListStore$: (name: string) => Store<TodoListActions>;
