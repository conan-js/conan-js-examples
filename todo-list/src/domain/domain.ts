export interface ToDo {
    id: string;
    description: string;
    status: ToDoStatus;
}

export enum ToDoStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export enum VisibilityFilters {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE'
}

export interface TodoListData {
    todos: ToDo[];
    appliedFilter: VisibilityFilters;
}

