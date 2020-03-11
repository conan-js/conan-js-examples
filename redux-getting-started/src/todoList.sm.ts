import {ToDo, ToDoStatus} from "./domain/domain";
import {StateMachine} from "../lib/conan-sm/stateMachine";
import {OnEventCallback, SmListener} from "../lib/conan-sm/stateMachineListeners";
import {Stage} from "../lib/conan-sm/stage";

export interface TodoListData {
    todos: ToDo[];
    appliedFilter: ToDoStatus [];
}

export interface NextTodoList extends Stage <'nextTodoList', TodoListData> {}

export interface TodoListActions {
    toggleTodo(todoId: string): NextTodoList;

    addTodo(todo: ToDo): NextTodoList;

    filterAll(): NextTodoList;

    filterByStatus(status: ToDoStatus): NextTodoList;
}

export interface TodoListListener extends SmListener<TodoListActions> {
    onNextTodoList?: OnEventCallback<TodoListActions>;
}

export let TodoListStateMachineFactory = (initialData: TodoListData): StateMachine<TodoListListener> =>
    new StateMachine<TodoListListener>()
        .withInitialState('nextTodoList', initialData)
        .withState<TodoListActions, TodoListData>('nextTodoList', (currentState) => ({
            toggleTodo: (todoId: string): NextTodoList => ({
                nextState: 'nextTodoList',
                data: {
                    todos: currentState.todos.map( todo =>
                        (todo.id == todoId)
                            ? {...todo, status: (todo.status === ToDoStatus.PENDING ? ToDoStatus.COMPLETED : ToDoStatus.PENDING)}
                            : todo,
                    ),
                    appliedFilter: currentState.appliedFilter
                }
            }),
            addTodo: (todo: ToDo): NextTodoList => ({
                nextState: 'nextTodoList',
                data: {
                    todos: [...currentState.todos, todo],
                    appliedFilter: currentState.appliedFilter
                }
            }),
            filterAll: (): NextTodoList => ({
                nextState: 'nextTodoList',
                data: {
                    todos: currentState.todos,
                    appliedFilter: undefined
                }
            }),
            filterByStatus: (status: ToDoStatus): NextTodoList => ({
                nextState: 'nextTodoList',
                data: {
                    todos: currentState.todos,
                    appliedFilter: [status]
                }
            })
        }));
