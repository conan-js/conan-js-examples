export interface ToDo {
    id: string;
    description: string;
    status: ToDoStatus;
}
export declare enum ToDoStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}
export declare enum VisibilityFilters {
    SHOW_ALL = "SHOW_ALL",
    SHOW_COMPLETED = "SHOW_COMPLETED",
    SHOW_ACTIVE = "SHOW_ACTIVE"
}
