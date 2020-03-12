import * as React from "react";
import {TodoListActions, TodoListData, TodoListStoreFactory} from "../stores/todoList.store";
import {TodoList, TodoListProps} from "../renderers/todoList.renderer";
import {PropsInjector} from "conan-ui-core/src/lib/conan-sm-react/propsInjector";


export const TodoListConnector = PropsInjector
    .create<TodoListActions, TodoListData, TodoListProps>(
        'todo-list-container',
        TodoListStoreFactory({
            todos: [],
            appliedFilter: []
        }),
        TodoList,
        (params) => ({
            todos: params.data.todos,
            actions: params.actions
        })
    );
