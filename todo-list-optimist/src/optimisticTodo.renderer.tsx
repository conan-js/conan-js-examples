import * as React from "react";
import {ICallback} from "conan-js-core";
import {OptimisticStatus} from "./domain";
import {Button, CircularProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

interface TodoProps {
    toggleCb: ICallback;
    completed: boolean;
    text: string;
    status: OptimisticStatus,
    cancelCb: ICallback,
    id: string
}

export class OptimisticTodo extends React.Component<TodoProps> {
    render() {
        return (
            <ListItem
                key={this.props.id}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
            >
                <ListItemIcon>
                    {this.props.completed ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                </ListItemIcon>
                <ListItemText primary={this.props.text} />
                <Button variant="outlined" color="primary" onClick={this.props.toggleCb}>toggle</Button>
                {this.props.status === OptimisticStatus.IN_PROCESS &&
                        <><CircularProgress/><CancelIcon onClick={this.props.cancelCb} /></>
                }
            </ListItem>
        );
    }
}
