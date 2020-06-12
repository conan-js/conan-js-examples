import {Reducers, ReducersFn} from "conan-js-core";
import {ToDo, TodoListData, ToDoStatus, VisibilityFilters} from "../domain/domain";

export interface TodoListReducers extends Reducers<TodoListData>{
    $toggleTodo(todo: ToDo): TodoListData;

    $addTodo(todo: ToDo): TodoListData;

    $filter(filter: VisibilityFilters): TodoListData;
}


export const TodoListReducersFn: ReducersFn<TodoListData, TodoListReducers> = getState => ({
    $toggleTodo: (toggledTodo: ToDo): TodoListData => ({
        todos: getState().todos.map(todo =>
            todo.id !== toggledTodo.id ? todo : {
                ...todo,
                status: (todo.status === ToDoStatus.PENDING ? ToDoStatus.COMPLETED : ToDoStatus.PENDING)
            },
        ),
        appliedFilter: getState().appliedFilter
    }),
    $addTodo: (todo: ToDo): TodoListData => ({
        todos: [...getState().todos, todo],
        appliedFilter: getState().appliedFilter
    }),
    $filter: (filter: VisibilityFilters): TodoListData => (
        {
            todos: getState().todos,
            appliedFilter: filter
        })
})
