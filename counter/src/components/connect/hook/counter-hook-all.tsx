import * as React from "react";
import {FunctionComponent} from "react";
import {CounterActions, CounterData, counterState$} from "../../../state/counter.state$";
import {useConantState, useContextConantState} from "conan-js-core";

export const CounterCompHookContainerAll: FunctionComponent = (): React.ReactElement => {
    const [, actions, ConanContext] = useConantState <CounterData, CounterActions>(counterState$);

    return (
        <div>
            <button onClick={actions.increment}>Increment!</button>
            <button onClick={actions.decrement}>Decrement!</button>
            <ConanContext>
                <CounterDisplay/>
            </ConanContext>
        </div>
    );
}

export const CounterDisplay = () => {
    const [data] = useContextConantState <CounterData, CounterActions>();

    return (
        <div>
            <h1>{data.counter}</h1>
        </div>
    );
};
