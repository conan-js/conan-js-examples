import {ICallback} from "conan-ui-core/src/lib/conan-utils/typesHelper";
import * as React from "react";

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
