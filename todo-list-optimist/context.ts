import {TodoListService, TodoListServiceImpl} from "../todo-list-async/src/services/todoListService";
import {DiContextFactory} from "../../core/conan-di/core/diContext";
import {TodoListAsyncStateFactory} from "../todo-list-async/src/state/todo-list-async.state$";
import {ConanState} from "../../core/conan-react/conanState";
import {OptimisticTodoListData} from "./src/domain/domain";
import {TodoListActions} from "../common-todo/state/todoListSync.state";
import {OptimisticTodoListData$} from "./src/state/optimisticTodoDataState";
import {App} from "../common-todo/domain/domain";

export interface InternalDependencies {
    todoListService: TodoListService
}

export interface OptimisticApp extends App{
    optimisticTodoListState: ConanState<OptimisticTodoListData, TodoListActions>
}

export let diContext = DiContextFactory.createContext<OptimisticApp, InternalDependencies>({
        todoListState: TodoListAsyncStateFactory.create,
        optimisticTodoListState: OptimisticTodoListData$
    }, {
        todoListService: TodoListServiceImpl
    },
);

