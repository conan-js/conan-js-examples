import * as React from "react";
import {ICallback} from "../../../../../../core";
import {counterState$} from "../../../state/counter.state$";

export const CounterAppDirectMap = (): React.ReactElement => counterState$.connectMap<CounterContainerProps> (
    CounterContainer,
    (data, actions)=>({
        decrementCounter: actions.decrement,
        incrementCounter: actions.increment
    })
)

export interface CounterContainerProps {
    incrementCounter: ICallback;
    decrementCounter: ICallback;
}

export class CounterContainer extends React.Component<CounterContainerProps> {
    render() {
        return (
            <div>
                <button onClick={this.props.incrementCounter}>Increment!</button>
                <button onClick={this.props.decrementCounter}>Decrement!</button>
                {counterState$.connectMap<CounterDisplayProps> (
                    CounterDisplay,
                    data=>({
                        counter: data.counter
                    })
                )
                }
            </div>
        );
    }
}

export interface CounterDisplayProps {
    counter: number;
}

export class CounterDisplay extends React.Component<CounterDisplayProps> {
    render() {
        return (
            <div>
                <h1>{this.props.counter}</h1>
            </div>
        );
    }
}
