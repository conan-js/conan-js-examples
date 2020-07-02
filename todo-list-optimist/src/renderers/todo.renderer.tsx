import * as React from "react";
import {ICallback} from "conan-js-core";
import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface TodoProps {
    onClick: ICallback;
    completed: boolean;
    text: string;
}

export class Todo extends React.Component<TodoProps> {
    render() {
        return (
            <><ListItem
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
            >
                <ListItemIcon>
                    {this.props.completed ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                </ListItemIcon>
                <ListItemText primary={this.props.text}/>
            </ListItem>
                <Divider light/></>
        );
    }
}
