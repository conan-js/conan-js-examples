import {ToDo, ToDoStatus} from "../domain/domain";
import * as React from "react";
import {IConsumer} from "conan-js-core";

interface AddTodoProps {
    onClick: IConsumer<ToDo>;
}

let nextTodoId = 0;

export class AddTodo extends React.Component<AddTodoProps> {
    render() {
        let input: HTMLInputElement;

        return (
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        if (!input.value.trim()) {
                            return
                        }
                        this.props.onClick(
                            {
                                id: String(nextTodoId++),
                                description: input.value,
                                status: ToDoStatus.PENDING,
                            }
                        );
                        input.value = ''
                    }}
                >
                    <input
                        ref={node => {
                            if (node) {
                                input = node
                            }
                        }}
                    />
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        )
    }
}
