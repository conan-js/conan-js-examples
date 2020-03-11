import * as React from "react";
import {ToDo, ToDoStatus} from "../domain/domain";
import {Todo} from "./todo.renderer";
import {AddTodo} from "./addTodo.renderer";
import {TodoListActions} from "../stores/todoList.store";

export interface TodoListProps {
    todos: ToDo[];
    actions: TodoListActions;
}

export const TodoList = (props: TodoListProps) => <div className="App">
    <ul>
        {props.todos.map(todo =>
            <Todo
                key={todo.id}
                onClick={() => props.actions.toggleTodo(todo.id)}
                text={todo.description}
                completed={todo.status === ToDoStatus.COMPLETED}
            />
        )}
    </ul>
    <AddTodo onClick={props.actions.addTodo}/>
</div>;


