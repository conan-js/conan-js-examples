import * as React from "react";
import {ReactElement} from "react";
import {ToDo, ToDoStatus, VisibilityFilters} from "../domain/domain";
import {Todo} from "./todo.renderer";
import {AddTodo} from "./addTodo.renderer";
import {TodoListActions, TodoListData} from "../stores/todoList.store";
import {ICallback, IConsumer} from "conan-ui-core";

export interface TodoListProps {
    todoListData: TodoListData;
    actions: TodoListActions;
}

export const TodoList = (props: TodoListProps): ReactElement => <div className="Index">
    <AddTodo onClick={props.actions.addTodo}/>
    <ul>
        {filterToDos(props.todoListData.todos, props.todoListData.appliedFilter).map(todo =>
            <Todo
                key={todo.id}
                onClick={() => props.actions.toggleTodo(todo.id)}
                text={todo.description}
                completed={todo.status === ToDoStatus.COMPLETED}
            />
        )}
    </ul>
    <Footer onFilter={props.actions.filter} appliedFilter={props.todoListData.appliedFilter}/>
</div>;

const Link = ({active, children, onClick}: { active: boolean, children: ReactElement[], onClick: ICallback }) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </button>
)

const FilterLink = ({filter, onClick, active, children}: { filter: VisibilityFilters, onClick: IConsumer<VisibilityFilters>, active: boolean, children: any }) => (
    <Link active={active} onClick={() => onClick(filter)}>
        {children}
    </Link>
);

export const Footer = ({onFilter, appliedFilter}: { onFilter: IConsumer<VisibilityFilters>, appliedFilter: VisibilityFilters }) => (
    <div>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL} active={appliedFilter === VisibilityFilters.SHOW_ALL}
                    onClick={onFilter}>
            All
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE} active={appliedFilter === VisibilityFilters.SHOW_ACTIVE}
                    onClick={onFilter}>
            Active
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}
                    active={appliedFilter === VisibilityFilters.SHOW_COMPLETED} onClick={onFilter}>
            Completed
        </FilterLink>
    </div>
)

function filterToDos(todos: ToDo[], filter: VisibilityFilters): ToDo[] {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.status === ToDoStatus.COMPLETED)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => t.status === ToDoStatus.PENDING)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

