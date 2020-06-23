import {ConanState} from "conan-js-core";
import {OptimisticStatus, OptimisticTodoListData} from "./domain";
import {TodoListActions, TodoListState} from "./state/todoListSync.state";
import {ToDo, VisibilityFilters} from "./domain/domain";
import {MonitorStatus} from "conan-js-core";
import {Lists} from "conan-js-core";

export const OptimisticTodoListData$ = (todoListState: TodoListState): ConanState<OptimisticTodoListData, TodoListActions> => todoListState.asyncMerge<OptimisticTodoListData>(
    {
        appliedFilter: VisibilityFilters.SHOW_ALL,
        todos: []
    },
    (monitorInfo, data, current) => {
        if (monitorInfo.currentAction == null) {
            return current;
        }

        let asyncTodo: ToDo = monitorInfo.currentAction.payload [0];
        if (monitorInfo.status === MonitorStatus.ASYNC_CANCELLED) {
            return ({
                appliedFilter: current.appliedFilter,
                todos: current.todos.filter(it => it.data.id !== asyncTodo.id)
            })
        }

        if (monitorInfo.status !== MonitorStatus.ASYNC_START) {
            return current;

        }

        return monitorInfo.currentAction.name === 'addTodo' ? {
            appliedFilter: current.appliedFilter,
            todos: [...current.todos, {
                status: OptimisticStatus.IN_PROCESS,
                data: asyncTodo,
                cancelCb: () => {
                    if (monitorInfo.currentAction == null) {
                        throw new Error(`unexpected error`);
                    }

                    monitorInfo.currentAction.asap.cancel()
                }
            }]
        } : monitorInfo.currentAction.name === 'toggleTodo' ? {
                appliedFilter: current.appliedFilter,
                todos: current.todos.map(todo => todo.data.id !== asyncTodo.id ? todo : {
                    status: OptimisticStatus.IN_PROCESS,
                    data: {
                        ...asyncTodo
                    },
                    cancelCb: () => {
                        if (monitorInfo.currentAction == null) {
                            throw new Error(`unexpected error`);
                        }

                        monitorInfo.currentAction.asap.cancel()
                    }
                })
            } :
            current
    },
    (data, monitorInfo, optimisticData) => ({
        appliedFilter: data.appliedFilter,
        todos: Lists.mergeCombine(
            data.todos,
            optimisticData.todos,
            (todo, optimisticTodo) => todo.id === optimisticTodo.data.id,
            (todo, optimisticTod) => ({
                status: OptimisticStatus.SETTLED,
                data: todo,
                cancelCb: () => {
                }
            })
        )
    })
)
