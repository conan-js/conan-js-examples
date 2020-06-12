import * as React from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {ConnectedState} from "../../../../../../core/conan-react/connect/stateConnect";

export const CounterAppDirectAll = (): React.ReactElement => counterState$.connect (CounterContainer)

export class CounterContainer extends React.Component<ConnectedState<CounterData, CounterActions>> {
    render() {
        return (
            <div>
                <button onClick={this.props.actions.increment}>Increment!</button>
                <button onClick={this.props.actions.decrement}>Decrement!</button>
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
