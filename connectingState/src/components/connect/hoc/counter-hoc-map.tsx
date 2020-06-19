import * as React from "react";
import {ICallback} from "conan-js-core";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {ContextStateMapConnect} from "conan-js-core";
import {StateMapConnect} from "conan-js-core";

export const CounterAppHOCMap = (): React.ReactElement => {
    return <StateMapConnect<CounterData, CounterContainerProps, CounterActions>
        from={counterState$}
        into={CounterContainer}
        mapper={(data, actions) => ({
            incrementCounter: actions.increment,
            decrementCounter: actions.decrement
        })}
    />
}

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
                <ContextStateMapConnect<CounterDisplayProps, CounterData, CounterActions>
                    into={CounterDisplay}
                    mapper={(data) => ({
                        counter: data.counter
                    })
                    }/>
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
