import * as React from "react";
import {diContext} from "./context";
import {StateConnect} from "conan-js-core";
import {TodoListActions} from "./state/todoListSync.state";
import {TodoListData, VisibilityFilters} from "./domain/domain";
import {TodoListRenderer} from "./renderers/todoList.renderer";

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
