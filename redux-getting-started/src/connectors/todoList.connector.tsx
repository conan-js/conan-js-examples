import * as React from "react";
import {TodoListActions, TodoListData, TodoListStoreFactory} from "../stores/todoList.store";
import {TodoList, TodoListProps} from "../renderers/todoList.renderer";
import {PropsInjector} from "conan-ui-core/src/lib/conan-sm-react/propsInjector";
import {VisibilityFilters} from "../domain/domain";


export const TodoListConnector = PropsInjector
    .create<TodoListActions, TodoListData, TodoListProps>(
        'todo-list-container',
        TodoListStoreFactory({
            todos: [],
            appliedFilter: VisibilityFilters.SHOW_ALL
        }),
        TodoList,
        params => ({
            todoListData: params.data,
            actions: params.actions
        })
    );
