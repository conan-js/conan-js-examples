import {Asap, Asaps} from "conan-js-core";
import {ToDo, ToDoStatus} from "../domain/domain";

export interface TodoListService {
    fetch(): Asap<ToDo[]>;

    addTodo(todo: ToDo): Asap<ToDo>;

    toggleTodo(todo: ToDo): Asap<ToDo>;
}

export class TodoListServiceImpl implements TodoListService {
    public fetch(): Asap<ToDo[]> {
        return Asaps.delayed([{description: 'test', id: '-1', status: ToDoStatus.PENDING}], 500, 'fetch');
    }

    public addTodo(todo: ToDo): Asap<ToDo> {
        return Asaps.delayed(todo, 5000, 'addTodo');
    }

    public toggleTodo(todo: ToDo): Asap<ToDo> {
        return Asaps.delayed(todo, 1000, 'toggleTodo');
    }
}
