import * as React from "react";
import {contextStateLive, stateLive} from "../../../../../core/conan-react/live/stateLive";
import {CounterActions, CounterData, counterState$} from "../../state/counter.state$";

export const CounterLiveAppCompAll = (): React.ReactElement => stateLive<CounterData, CounterActions>(
    counterState$,
    (data, actions) => (
        <div>
            <button onClick={actions.increment}>Increment!</button>
            <button onClick={actions.decrement}>Decrement!</button>
            <CounterDisplay/>
        </div>
    )
)

export class CounterDisplay extends React.Component {
    render() {
        return (
            <div>
                {contextStateLive<CounterData>( data => (
                    <h1>{data.counter}</h1>
                ))}
            </div>
        );
    }
}
