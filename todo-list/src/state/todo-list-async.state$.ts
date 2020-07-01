import {Conan} from "conan-js-core";
import {TodoListData, VisibilityFilters} from "../domain/domain";
import {TodoListReducers, TodoListReducersFn} from "./todoList.reducers";
import {TodoListService} from "../services/todoListService";
import {TodoListState} from "./todoListSync.state";


export class TodoListAsyncStateFactory {
    static create(todoListService: TodoListService): TodoListState {
        return Conan.state<TodoListData, TodoListReducers>({
            name: 'todos-async',
            initialData: {
                appliedFilter: VisibilityFilters.SHOW_ALL,
                todos: []
            },
            reducers: TodoListReducersFn,
            autoBind: todoListService
        })
    }
}
