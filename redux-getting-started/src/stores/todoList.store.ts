import {ToDo, ToDoStatus, VisibilityFilters} from "../domain/domain";
import {Store, StoreFactory} from "conan-ui-core";

export interface TodoListData {
    todos: ToDo[];
    appliedFilter: VisibilityFilters;
}

export interface TodoListActions {
    toggleTodo(todoId: string): TodoListData;

    addTodo(todo: ToDo): TodoListData;

    filter(filter: VisibilityFilters): TodoListData;
}
let a = StoreFactory;
debugger;
export let TodoListStoreFactory = (initialData?: TodoListData): Store<TodoListActions> => StoreFactory.create(
    initialData,
    (currentState) => ({
        toggleTodo: (todoId: string): TodoListData => ({
            todos: currentState.todos.map(todo =>
                todo.id != todoId ? todo : {
                    ...todo,
                    status: (todo.status === ToDoStatus.PENDING ? ToDoStatus.COMPLETED : ToDoStatus.PENDING)
                },
            ),
            appliedFilter: currentState.appliedFilter
        }),
        addTodo: (todo: ToDo): TodoListData => ({
            todos: [...currentState.todos, todo],
            appliedFilter: currentState.appliedFilter
        }),
        filter: (filter: VisibilityFilters): TodoListData => (
            {
            todos: currentState.todos,
            appliedFilter: filter
        })
    })
);
