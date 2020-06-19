import * as React from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {ConnectedState} from "conan-js-core";

export const CounterAppDirectData = (): React.ReactElement => counterState$.connectData(CounterContainer)

export class CounterContainer extends React.Component<CounterData> {
    render() {
        return (
            <>
                <button onClick={counterState$.do.increment}>Increment!</button>
                <button onClick={counterState$.do.decrement}>Decrement!</button>
                <div>
                    <h1>{this.props.counter}</h1>
                </div>
            </>
        );
    }
}

