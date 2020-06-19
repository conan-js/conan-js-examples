import * as React from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {ConnectedState} from "conan-js-core";

export class CounterAppDirectRef extends React.Component {
    render() {
        return (
            <div>
                <button onClick={counterState$.do.increment}>Increment!</button>
                <button onClick={counterState$.do.decrement}>Decrement!</button>
                {counterState$.connect(CounterDisplay)}
            </div>
        );
    }
}

export class CounterDisplay extends React.Component<ConnectedState<CounterData, CounterActions>> {
    render() {
        return (
            <div>
                <h1>{this.props.data.counter}</h1>
            </div>
        );
    }
}
