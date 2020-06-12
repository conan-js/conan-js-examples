import * as React from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {ContextStateConnect} from "../../../../../../core/conan-react/connect/contextStateConnectMap";
import {ConnectedState, StateConnect} from "../../../../../../core/conan-react/connect/stateConnect";

export const CounterAppHOCAll = (): React.ReactElement => {
    return <StateConnect<CounterData, CounterActions>
        from={counterState$}
        into={CounterContainer}
    />
}

export class CounterContainer extends React.Component<ConnectedState<CounterData, CounterActions>> {
    render() {
        return (
            <div>
                <button onClick={this.props.actions.increment}>Increment!</button>
                <button onClick={this.props.actions.decrement}>Decrement!</button>
                <ContextStateConnect<CounterData, CounterActions>
                    into={CounterDisplay}
                />
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
