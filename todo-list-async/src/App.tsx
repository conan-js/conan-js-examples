import * as React from "react";
import {StateConnect} from "conan-js-core";
import {TodoListRenderer} from "./renderers/todoList.renderer";
import {diContext} from "./context";
import {TodoListData, VisibilityFilters} from "./domain/domain";
import {TodoListActions} from "./state/todoListSync.state";
import {Container, ThemeProvider} from "@material-ui/core";
import {theme} from "./styles/styles";

export class TodoListASyncApp extends React.Component {
    render() {
        let stateConnect = <StateConnect<TodoListData, TodoListActions>
            from={diContext.todoListState}
            into={TodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL,
            }}
        />;
        return <ThemeProvider theme={theme}>{stateConnect}</ThemeProvider>
    }
}
