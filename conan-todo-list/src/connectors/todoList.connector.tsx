import {TodoListActions, TodoListData, TodoListStore} from "../stores/todoList.store";
import {TodoList, TodoListProps} from "../renderers/todoList.renderer";
import {VisibilityFilters} from "../domain/domain";
import {ReactComponentConnector} from "conan-ui-core";

export const TodoListConnector = ReactComponentConnector
    .connect<TodoListActions, TodoListData, TodoListProps>(
        'todo-list-container',
        TodoListStore({
            todos: [],
            appliedFilter: VisibilityFilters.SHOW_ALL
        }),
        TodoList,
        params => ({
            todoListData: params.data,
            actions: params.actions
        })
    );
