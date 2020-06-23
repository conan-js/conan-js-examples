import * as React from "react";
import {StateConnect} from "conan-js-core";
import {TodoListActions} from "./state/todoListSync.state";
import {VisibilityFilters} from "./domain/domain";
import {diContext} from "../context";
import {OptimisticTodoListData} from "./domain/domain";
import {OptimisticTodoListRenderer} from "./renderers/optimisticTodoListRenderer";

export class TodoListOptimisticApp extends React.Component {
    render() {
        return <StateConnect<OptimisticTodoListData, TodoListActions>
            from={diContext.optimisticTodoListState}
            into={OptimisticTodoListRenderer}
            fallbackValue={{
                todos: [],
                appliedFilter: VisibilityFilters.SHOW_ALL
            }}
        />
    }
}
