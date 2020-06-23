import {ToDo, VisibilityFilters} from "./domain/domain";
import {ICallback} from "conan-js-core";

export enum OptimisticStatus {
    SETTLED= 'SETTLED',
    IN_PROCESS= 'IN_PROCESS',
}

export interface OptimisticData<T> {
    data: T;
    status: OptimisticStatus;
    cancelCb: ICallback;
}

export interface OptimisticTodoListData {
    todos: OptimisticData<ToDo>[];
    appliedFilter: VisibilityFilters;
}
