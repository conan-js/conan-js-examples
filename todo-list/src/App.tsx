import * as React from "react";
import {TodoListRenderer} from "./renderers/todoList.renderer";
import {TodoListData, VisibilityFilters} from "./domain/domain";
import {diContext} from "./context";
import {TodoListActions, TodoListState} from "./state/todoListSync.state";
import {StateConnect} from "conan-js-core";

export class TodoListSyncApp extends React.Component {
    render() {
        return <StateConnect<TodoListData, TodoListActions>
            from={diContext.todoListState}
            into={TodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL
            }}
        />
    }
}
