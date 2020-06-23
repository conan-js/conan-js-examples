import * as React from "react";
import {ICallback} from "conan-js-core";
import {OptimisticStatus} from "../domain/domain";

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
            <li
                key={this.props.id}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
            >
                {this.props.text} <button onClick={this.props.toggleCb}>toggle</button>{this.props.status === OptimisticStatus.IN_PROCESS &&
                    <>'  ...LOADING!...' <button onClick={this.props.cancelCb}>cancel</button></>
                }
            </li>
        );
    }
}
