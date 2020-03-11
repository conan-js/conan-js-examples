import * as React from "react";
import {ReactElement} from "react";
import {TodoListActions, TodoListData, TodoListStoreFactory} from "../stores/todoList.store";
import {TodoList} from "../renderers/todoList.renderer";

interface TodoListContainerState {
    actions: TodoListActions;
    data: TodoListData;
}

export class TodoListContainer extends React.Component<{}, TodoListContainerState> {
    private stateMachine = TodoListStoreFactory({
        appliedFilter: undefined,
        todos: []
    }).addListener([`::nextToDoList->render`, {
        onNextData: (actions, params) => this.setState({
            actions,
            data: params.sm.getState()
        })
    }]);

    componentDidMount(): void {
        this.stateMachine.start('todo-list-state-machine');
    }

    render(): ReactElement {
        if (this.state == null) return null;

        return <TodoList
                todos={this.state.data.todos}
                actions={this.state.actions}
        />;
    }
}


