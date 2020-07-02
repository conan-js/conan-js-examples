import {ToDo, ToDoStatus} from "../domain/domain";
import * as React from "react";
import {IConsumer} from "conan-js-core";
import {Box, Button, TextField} from "@material-ui/core";


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
                    <Box component="span" m={1}>
                        <TextField size="small" label="type something..." inputRef={node => {
                            if (node) {
                                input = node
                            }
                        }}
                        />
                    </Box>
                    <Box component="span" m={1}><Button variant="outlined" color="secondary" type="submit">Add
                        Todo</Button></Box>
                </form>
            </div>
        )
    }
}
