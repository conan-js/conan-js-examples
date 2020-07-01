import * as React from "react";
import {ReactElement} from "react";
import {ToDo, TodoListData, ToDoStatus, VisibilityFilters} from "../domain/domain";
import {Todo} from "./todo.renderer";
import {AddTodo} from "./addTodo.renderer";
import {ConnectedState} from "conan-js-core";
import {TodoListActions} from "../state/todoListSync.state";
import {MonitorStatus} from "conan-js-core";
import {Button, createStyles, Grid, List, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ICallback, IConsumer} from "conan-js-core";

export function TodoListRenderer({data, actions, monitorInfo}: ConnectedState<TodoListData, TodoListActions>): ReactElement {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }),
    );
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={1} >
                {monitorInfo.status !== MonitorStatus.IDLE && monitorInfo.currentAction && monitorInfo.inProgressActions &&
                <Grid item xs={12} >
                    <span>processing: {monitorInfo.currentAction.name} [{monitorInfo.status}]</span>
                    <span>in progress: [{monitorInfo.inProgressActions.map(it => it.name).join(', ')}]</span>
                </Grid>
                }
                <Grid item xs={12} >
                    <AddTodo onClick={actions.addTodo}/>
                </Grid>
                <Grid item xs={12} >
                    <List>
                        {filterToDos(data.todos, data.appliedFilter).map(todo =>
                            <Todo
                                key={todo.id}
                                onClick={() => actions.toggleTodo(todo)}
                                text={todo.description}
                                completed={todo.status === ToDoStatus.COMPLETED}
                            />
                        )}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <FooterRenderer appliedFilter={data.appliedFilter} filterUpdater={actions.filter}/>
                </Grid>
            </Grid>
        </div>
    );
}

export class Link extends React.Component<{ active: boolean, onClick: ICallback }> {
    render() {
        let {active, children, onClick} = this.props;
        return (
            <Button variant="outlined" color="secondary"
                    onClick={onClick}
                    disabled={active}
                    style={{
                        marginLeft: '4px',
                    }}
            >
                {children}
            </Button>
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
                <span><Typography>Show : </Typography></span>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_ALL}
                    onClick={() => this.props.filterUpdater(VisibilityFilters.SHOW_ALL)}
                >
                    ALL
                </Link>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_ACTIVE}
                    onClick={() => this.props.filterUpdater(VisibilityFilters.SHOW_ACTIVE)}
                >
                    Active
                </Link>
                <Link
                    active={appliedFilter === VisibilityFilters.SHOW_COMPLETED}
                    onClick={() => this.props.filterUpdater(VisibilityFilters.SHOW_COMPLETED)}
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
