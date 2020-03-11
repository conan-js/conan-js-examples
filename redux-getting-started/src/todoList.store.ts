import {ToDo, ToDoStatus} from "./domain/domain";
import {StoreFactory, Store} from "conan-ui-core/src/lib/conan-store/store";

export interface TodoListData {
    todos: ToDo[];
    appliedFilter: ToDoStatus [];
}

export interface TodoListActions {
    toggleTodo(todoId: string): TodoListData;

    addTodo(todo: ToDo): TodoListData;

    filterAll(): TodoListData;

    filterByStatus(status: ToDoStatus): TodoListData;
}

export let TodoListStoreFactory = (initialData: TodoListData): Store<TodoListActions> => StoreFactory.create(
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
        filterAll: (): TodoListData => ({
            todos: currentState.todos,
            appliedFilter: undefined
        }),
        filterByStatus: (status: ToDoStatus): TodoListData => ({
            todos: currentState.todos,
            appliedFilter: [status]
        })
    })
);
