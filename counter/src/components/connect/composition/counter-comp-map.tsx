import * as React from "react";
import {ICallback} from "conan-js-core";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {contextStateMapConnect} from "conan-js-core";
import {stateMapConnect} from "conan-js-core";

export const CounterAppCompMap = (): React.ReactElement => stateMapConnect<CounterData, CounterContainerProps, CounterActions>(
    counterState$,
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
                {contextStateMapConnect<CounterData, CounterDisplayProps, CounterActions>(
                    CounterDisplay,
                    (data)=>({
                        counter: data.counter
                    })
                )}
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
