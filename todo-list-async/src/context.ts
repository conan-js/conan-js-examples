import {DiContextFactory} from "conan-js-core";
import {TodoListService, TodoListServiceImpl} from "./todoListService";
import {TodoListAsyncStateFactory} from "./state/todo-list-async.state$";
import {App} from "./domain/domain";

export interface InternalDependencies {
    todoListService: TodoListService
}

export let diContext = DiContextFactory.createContext<App, InternalDependencies>({
        todoListState: TodoListAsyncStateFactory.create,
    }, {
        todoListService: TodoListServiceImpl
    },
);

