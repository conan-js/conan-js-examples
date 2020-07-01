import * as React from "react";
import {TodoListRenderer} from "./renderers/todoList.renderer";
import {TodoListData, VisibilityFilters} from "./domain/domain";
import {diContext} from "./context";
import {TodoListActions} from "./state/todoListSync.state";
import {StateConnect} from "conan-js-core";
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./styles/styles";

export class TodoListSyncApp extends React.Component {

    render() {
        let stateConnect = <StateConnect<TodoListData, TodoListActions>
            from={diContext.todoListState}
            into={TodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL
            }}
        />;
        return <ThemeProvider theme={theme}>{stateConnect}</ThemeProvider>
    }
}
