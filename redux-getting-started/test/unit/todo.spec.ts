import {expect} from "chai";
import {ListenerType, SmController} from "conan-ui-core";
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
        let sm: SmController<any, any> = TodoListStoreFactory(INITIAL_STATE)
            .addListener([`::nextTodoList=>addTodo`, {
                onNextData: (actions) => actions.addTodo(INITIAL_TODO)
            }], ListenerType.ONCE)
            .start('todo-list-store')
            .stop();

        expect(sm.getStateData()).to.deep.eq({
            todos: [INITIAL_TODO],
            appliedFilter: undefined
        });

    })
});
