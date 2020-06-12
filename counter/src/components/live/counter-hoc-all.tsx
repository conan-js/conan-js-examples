import * as React from "react";
import {ContextStateLive, StateLive} from "../../../../../core/conan-react/live/stateLive";
import {CounterActions, CounterData, counterState$} from "../../state/counter.state$";

export const CounterLiveAppHOCAll = (): React.ReactElement => {
    return <StateLive<CounterData, CounterActions>
        from={counterState$}
        renderer={(data, actions)=>(
            <div>
                <button onClick={actions.increment}>Increment!</button>
                <button onClick={actions.decrement}>Decrement!</button>
                <CounterDisplay/>
            </div>
        )}
    />
}

export class CounterDisplay extends React.Component {
    render() {
        return (
            <div>
                <ContextStateLive <CounterData>
                    renderer={data => (
                        <h1>{data.counter}</h1>
                    )}
                />
            </div>
        );
    }
}
