import {expect} from "chai";
import {ListenerType} from "../../../../conan-ui-core/src/lib/conan-sm/stateMachineListeners";
import {SmController} from "../../../../conan-ui-core/src/lib/conan-sm/_domain";
import {TodoListData, TodoListStoreFactory} from "../../src/todoList.sm";
import {ToDo, ToDoStatus} from "../../src/domain";

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
        let sm: SmController<any, any> = TodoListStoreFactory(INITIAL_STATE)
            .addListener([`::nextTodoList=>addTodo`, {
                onNextTodoList: (actions) => actions.addTodo(INITIAL_TODO)
            }], ListenerType.ONCE)
            .start('todo-list-store')
            .stop();

        expect(sm.getState()).to.deep.eq({
            todos: [INITIAL_TODO],
            appliedFilter: undefined
        });

    })
});
