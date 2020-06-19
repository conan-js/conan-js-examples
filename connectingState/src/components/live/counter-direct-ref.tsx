import * as React from "react";
import {counterState$} from "../../state/counter.state$";

export class CounterLiveAppDirectRef extends React.Component {
    render() {
        return (
            <div>
                <button onClick={counterState$.do.increment}>Increment!</button>
                <button onClick={counterState$.do.decrement}>Decrement!</button>
                {counterState$.connectLive(data=>(
                    <div>
                        <h1>{data.counter}</h1>
                    </div>
                ))}
            </div>
        );
    }
}
