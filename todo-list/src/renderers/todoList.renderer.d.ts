import * as React from "react";
import { VisibilityFilters } from "../domain/domain";
import { TodoListActions, TodoListData } from "../stores/todoList.store";
import { IConsumer } from "conan-ui-core";
export interface TodoListProps {
    todoListData: TodoListData;
    actions: TodoListActions;
}
export declare const TodoList: (props: TodoListProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
export declare const Footer: ({ onFilter, appliedFilter }: {
    onFilter: IConsumer<VisibilityFilters>;
    appliedFilter: VisibilityFilters;
}) => JSX.Element;
