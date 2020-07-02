import * as React from "react";
import {StateConnect} from "conan-js-core";
import {TodoListActions} from "./state/todoListSync.state";
import {VisibilityFilters} from "./domain/domain";
import {diContext} from "./context";
import {OptimisticTodoListData} from "./domain";
import {OptimisticTodoListRenderer} from "./optimisticTodoListRenderer";
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./styles/styles";

export class TodoListOptimisticApp extends React.Component {
    render() {
        let stateConnect = <StateConnect<OptimisticTodoListData, TodoListActions>
            from={diContext.optimisticTodoListState}
            into={OptimisticTodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL
            }}
        />;
        return <ThemeProvider theme={theme}>{stateConnect}</ThemeProvider>
    }
}
