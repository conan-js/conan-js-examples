import * as React from "react";
import {ReactElement} from "react";
import {ToDo, TodoListData, ToDoStatus, VisibilityFilters} from "../domain/domain";
import {Todo} from "./todo.renderer";
import {AddTodo} from "./addTodo.renderer";
import {ICallback, IConsumer} from "conan-js-core";
import {ConnectedState} from "conan-js-core";
import {TodoListActions} from "../state/todoListSync.state";
import {MonitorStatus} from "conan-js-core";


export function TodoListRenderer({data, actions, monitorInfo}: ConnectedState <TodoListData, TodoListActions>): ReactElement {
    return (
        <div className="Index">
            {monitorInfo.status !== MonitorStatus.IDLE && monitorInfo.currentAction && monitorInfo.inProgressActions &&
                <div>
                    <span>processing: {monitorInfo.currentAction.name} [{monitorInfo.status}]</span>
                    <span>in progress: [{monitorInfo.inProgressActions.map(it=>it.name).join(', ')}]</span>
                </div>
            }
            <AddTodo onClick={actions.addTodo}/>
            <ul>
                {filterToDos(data.todos, data.appliedFilter).map(todo =>
                    <Todo
                        key={todo.id}
                        onClick={() => actions.toggleTodo(todo)}
                        text={todo.description}
                        completed={todo.status === ToDoStatus.COMPLETED}
                    />
                )}
            </ul>
            <FooterRenderer appliedFilter={data.appliedFilter} filterUpdater={actions.filter}/>
        </div>
    );
}

export class Link extends React.Component<{ active: boolean, onClick: ICallback }> {
    render() {
        let {active, children, onClick} = this.props;
        return (
            <button
                onClick={onClick}
                disabled={active}
                style={{
                    marginLeft: '4px',
                }}
            >
                {children}
            </button>
        );
    }
}

interface FooterProperties {
    appliedFilter: VisibilityFilters;
    filterUpdater: IConsumer<VisibilityFilters>
}

export class FooterRenderer extends React.Component<FooterProperties> {
    render() {
        let {appliedFilter} = this.props;
        return (
            <div>
                <span>Show: </span>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_ALL}
                    onClick={()=>this.props.filterUpdater(VisibilityFilters.SHOW_ALL)}
                >
                    ALL
                </Link>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_ACTIVE}
                    onClick={()=>this.props.filterUpdater(VisibilityFilters.SHOW_ACTIVE)}
                >
                    Active
                </Link>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_COMPLETED}
                    onClick={()=>this.props.filterUpdater(VisibilityFilters.SHOW_COMPLETED)}
                >
                    Completed
                </Link>
            </div>
        );
    }
}


export function filterToDos(todos: ToDo[], filter: VisibilityFilters): ToDo[] {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.status === ToDoStatus.COMPLETED);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => t.status === ToDoStatus.PENDING);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}
