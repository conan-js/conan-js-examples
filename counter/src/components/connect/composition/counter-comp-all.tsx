import * as React from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {contextStateConnect} from "../../../../../../core/conan-react/connect/contextStateConnectMap";
import {ConnectedState, stateConnect} from "../../../../../../core/conan-react/connect/stateConnect";

export const CounterAppCompAll = (): React.ReactElement => stateConnect<CounterData, CounterActions>(
    counterState$,
    CounterContainer
)

export class CounterContainer extends React.Component<ConnectedState<CounterData, CounterActions>> {
    render() {
        return (
            <div>
                <button onClick={this.props.actions.increment}>Increment!</button>
                <button onClick={this.props.actions.decrement}>Decrement!</button>
                {contextStateConnect<CounterData, CounterActions>(CounterDisplay)}
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
