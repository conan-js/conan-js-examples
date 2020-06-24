import {TodoListService, TodoListServiceImpl} from "./services/todoListService";
import {DiContextFactory} from "conan-js-core";
import {ConanState} from "conan-js-core";
import {OptimisticTodoListData} from "./domain";
import {TodoListActions} from "./state/todoListSync.state";
import {OptimisticTodoListData$} from "./optimisticTodoDataState";
import {App} from "./domain/domain";
import {TodoListAsyncStateFactory} from "./state/todo-list-async.state$";

export interface InternalDependencies {
    todoListService: TodoListService
}

export interface OptimisticApp extends App {
    optimisticTodoListState: ConanState<OptimisticTodoListData, TodoListActions>
}

export let diContext = DiContextFactory.createContext<OptimisticApp, InternalDependencies>({
        todoListState: TodoListAsyncStateFactory.create,
        optimisticTodoListState: OptimisticTodoListData$
    }, {
        todoListService: TodoListServiceImpl
    },
);

