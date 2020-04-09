import * as React from "react";
import {ICallback} from "conan-js-core";

interface TodoProps {
    onClick: ICallback;
    completed: boolean;
    text: string;
}

export const Todo = (props: TodoProps) => (
    <li
        onClick={props.onClick}
        style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
    >
        {props.text}
    </li>
);
