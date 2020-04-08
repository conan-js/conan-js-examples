import * as React from "react";
import {TodoListActions, TodoListData, TodoListStore$} from "../stores/todoList.store";
import {TodoList, TodoListProps} from "../renderers/todoList.renderer";
import {ReactComponentConnector} from "conan-ui-core";
import {VisibilityFilters} from "../domain/domain";

let store = TodoListStore$('todo-list');

export const TodoListConnector: React.ComponentClass = ReactComponentConnector
    .connect<TodoListActions, TodoListData, TodoListProps>(
        'todo-list-container',
        store,
        TodoList,
        params => ({
            todoListData: params.data,
            actions: params.actions
        })
    );


store.start({
    name: 'nextData',
    data: {
        appliedFilter: VisibilityFilters.SHOW_ALL,
        todos: []
    } as TodoListData
});
