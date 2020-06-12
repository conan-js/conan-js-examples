import {ConanState} from "conan-js-core";
import {Reducers, ReducersFn} from "conan-js-core";
import {Conan} from "conan-js-core";

export interface CounterData {
    counter: number;
}

export interface CounterReducers extends Reducers<CounterData> {
    $increment(): CounterData;

    $decrement(): CounterData;
}

export interface CounterActions {
    increment(): void;

    decrement(): void;
}

export type CounterState = ConanState<CounterData, CounterActions>;

export const CounterReducers$: ReducersFn<CounterData, CounterReducers> = getState => ({
    $increment: (): CounterData => ({
        counter: getState().counter + 1
    }),
    $decrement: (): CounterData => ({
        counter: getState().counter - 1
    })
})

export const counterState$: CounterState = Conan.state<CounterData, CounterReducers, CounterActions>({
    name: 'counter',
    initialData: {
        counter: 0
    },
    reducers: CounterReducers$,
});
