import * as React from "react";
import {StateConnect} from "conan-js-core";
import {TodoListRenderer} from "./renderers/todoList.renderer";
import {diContext} from "./context";
import {TodoListData, VisibilityFilters} from "./domain/domain";
import {TodoListActions} from "./state/todoListSync.state";

export class TodoListASyncApp extends React.Component {
    render() {
        return <StateConnect<TodoListData, TodoListActions>
            from={diContext.todoListState}
            into={TodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL,
            }}
        />
    }
}
