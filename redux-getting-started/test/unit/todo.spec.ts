import {expect} from "chai";
import {ListenerType} from "conan-ui-core/src/lib/conan-sm/core/stateMachineListeners";
import {ToDo, ToDoStatus} from "../../src/domain/domain";
import {TodoListData, TodoListStoreFactory} from "../../src/stores/todoList.store";

describe('test todo list as in redux GS', () => {
    const INITIAL_STATE: TodoListData = {
        todos: [],
        appliedFilter: undefined
    };

    const INITIAL_TODO: ToDo = {
        description: 'new',
        status: ToDoStatus.PENDING,
        id: '1'
    };

    it('should work', () => {
        let sm = TodoListStoreFactory(INITIAL_STATE)
            .addListener([`::nextTodoList=>addTodo`, {
                onNextData: (actions) => actions.addTodo(INITIAL_TODO)
            }], ListenerType.ONCE)
            .start('todo-list-store');

        expect(sm.getStateData()).to.deep.eq({
            todos: [INITIAL_TODO],
            appliedFilter: undefined
        });

    })
});
