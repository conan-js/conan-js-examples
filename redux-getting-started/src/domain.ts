export interface ToDo {
    id: string;
    description: string;
    status: ToDoStatus;
}

export enum ToDoStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}
