import * as React from "react";
import {Reducers} from "conan-js-core";
import {Asap, Asaps} from "conan-js-core";
import {Conan} from "conan-js-core";
import {LineComponent} from "./components/lineComponents";

export interface CounterReducers extends Reducers<number> {
    $increment(): number;

    $decrement(): number;
}

export interface CounterAsapActions {
    increment(): Asap<number>;

    decrement(): Asap<number>;
}

export interface CounterSimpleActions {
    increment(): void;

    decrement(): void;
}

export interface CounterDeltaReducers extends Reducers<number> {
    $delta(delta: number): number;
}

export interface CounterDeltaActions {
    delta(delta: number): void;

    decrementTwice(): void;

    incrementTwice(): void;
}

export interface CustomAsyncActions {
    incrementAsync(): Asap<number>;

    decrementAsync(): Asap<number>;

    delta(delta: number): void;
}

export function CreateStateApp(): React.ReactElement {
    return (<div>
        <h1>Best for quick state all in memory</h1>
        <LineComponent
            desc={`Conan.light`}
            boxes={[{
                description: `Conan.light`,
                method1: `Conan.light<number>('conan.light', 0)`,
                method2: `actions.update`,
                counterElement: Conan.light<number>('conan.light', 0).connectLive(
                    (number, actions) => (<div>
                        <button onClick={() => actions.update(current => ++current)}>Increment!</button>
                        <button onClick={() => actions.update(current => --current)}>Decrement!</button>
                        <h1>{number}</h1>
                    </div>)
                )
            },]
            }/>

        <h1>Best for complex reducers/simple actions. All in memory</h1>
        <LineComponent
            desc={`Conan.state`}
            boxes={[
                {
                    description: `Only reducers (Auto actions)`,
                    method1: `Conan.state<number, CounterReducers, CounterAutoActions>`,
                    method2: `actions.increment() / actions.decrement() `,
                    counterElement: Conan.state<number, CounterReducers, CounterAsapActions>({
                        name: 'conan.state[reducers only]',
                        reducers: getData => ({
                            $decrement(): number {
                                return getData() - 1;
                            },
                            $increment(): number {
                                return getData() + 1;
                            }
                        }),
                        initialData: 0
                    })
                        .connectLive(
                            (number, actions) => (<div>
                                <button onClick={() => actions.increment()}>Increment!</button>
                                <button onClick={() => actions.decrement()}>Decrement!</button>
                                <h1>{number}</h1>
                            </div>)
                        )
                }, {
                    description: `Only actions (Custom Actions)`,
                    method1: `Conan.state<number, {}, CounterSimpleActions>`,
                    method2: `actions.increment() / actions.decrement() `,
                    counterElement: Conan.state<number, {}, CounterSimpleActions>({
                        name: 'conan.state[reducers only]',
                        actions: thread => ({
                            decrement(): void {
                                thread.reducers.$update(current => --current)
                            },
                            increment(): void {
                                thread.reducers.$update(current => ++current)
                            }
                        }),
                        initialData: 0
                    })
                        .connectLive(
                            (number, actions) => (<div>
                                <button onClick={() => actions.increment()}>Increment!</button>
                                <button onClick={() => actions.decrement()}>Decrement!</button>
                                <h1>{number}</h1>
                            </div>)
                        )
                }, {
                    description: `Auto & Custom Actions`,
                    method1: `Conan.state<number, CounterDeltaReducers, CounterDeltaActions>`,
                    method2: `actions.incrementTwice() / actions.decrementTwice() `,
                    counterElement: Conan.state<number, CounterDeltaReducers, CounterDeltaActions>({
                        name: 'conan.state[reducers only]',
                        reducers: getData => ({
                            $delta(delta: number): number {
                                return getData() + delta;
                            }
                        }),
                        actions: thread => ({
                            incrementTwice(): void {
                                thread.reducers.$delta(2);
                            },
                            decrementTwice(): void {
                                thread.reducers.$delta(-2);
                            }
                        }),
                        initialData: 0
                    })
                        .connectLive(
                            (number, actions) => (<div>
                                <button onClick={() => actions.incrementTwice()}>Increment!</button>
                                <button onClick={() => actions.decrementTwice()}>Decrement!</button>
                                <button onClick={() => actions.delta(5)}>Delta +5</button>
                                <h1>{number}</h1>
                            </div>)
                        )
                },

            ]}
        />


        <h1>Best for simple async state</h1>
        <LineComponent
            desc={`Conan.state - async`}
            boxes={[{
                description: `Conan.state [bind]`,
                method1: `Conan.state<number, CounterReducers, CounterAsapActions>`,
                method2: `actions.increment / actions.decrement`,
                counterElement: Conan.state<number, CounterReducers, CounterAsapActions>({
                    name: 'conan.state[reducers only]',
                    reducers: getData => ({
                        $decrement(): number {
                            return getData() - 1;
                        },
                        $increment(): number {
                            return getData() + 1;
                        }
                    }),
                    autoBind: {
                        increment(): Asap<void> {
                            return Asaps.delayed(undefined, 2000, 'increment');
                        },
                        decrement(): Asap<void> {
                            return Asaps.delayed(undefined, 2000, 'decrement');
                        }
                    },
                    initialData: 0
                })
                    .connectLive(
                        (number, actions) => (<div>
                            <button onClick={() => actions.increment()}>Increment!</button>
                            <button onClick={() => actions.decrement()}>Decrement!</button>
                            <h1>{number}</h1>
                        </div>)
                    )

            }, {
                description: `Conan.state [ASAP]`,
                method1: `Conan.state<number, CounterDeltaReducers, CustomAsyncActions>`,
                method2: `actions.incrementAsync / actions.decrementAsync`,
                counterElement: Conan.state<number, CounterDeltaReducers, CustomAsyncActions>({
                    name: 'conan.state[monitor]',
                    reducers: getData => ({
                            $delta(delta: number): number {
                                return getData() + delta;
                            }
                        }
                    ),
                    actions: thread => ({
                        incrementAsync(): void {
                            Asaps.delayed<number>(5, 2000, 'incrementAsync').then(value => thread.reducers.$delta(value));
                        },
                        decrementAsync(): void {
                            Asaps.delayed<number>(-5, 2000, 'decrementAsync').then(value => thread.reducers.$delta(value));
                        }
                    }),
                    initialData: 0
                })
                    .connectLive(
                        (number, actions) => (<div>
                            <button onClick={() => actions.incrementAsync()}>Increment!</button>
                            <button onClick={() => actions.decrementAsync()}>Decrement!</button>
                            <button onClick={() => actions.delta(-5)}>Delta -5</button>
                            <h1>{number}</h1>
                        </div>)
                    )

            }, {
                description: `Conan.state [monitor]`,
                method1: `Conan.state<number, CounterDeltaReducers, CustomAsyncActions>`,
                method2: `actions.incrementAsync / actions.decrementAsync / actions.delta`,
                counterElement: Conan.state<number, CounterDeltaReducers, CustomAsyncActions>({
                    name: 'conan.state[monitor]',
                    reducers: getData => ({
                            $delta(delta: number): number {
                                return getData() + delta;
                            }
                        }
                    ),
                    actions: thread => ({
                        incrementAsync(): Asap<number> {
                            return thread.monitor<number>(
                                Asaps.delayed<number>(5, 2000, 'incrementAsync'),
                                (result, reducers) => reducers.$delta(result),
                            );
                        },
                        decrementAsync(): Asap<number> {
                            return thread.monitor<number>(
                                Asaps.delayed<number>(-5, 2000, 'decrementAsync'),
                                (result, reducers) => reducers.$delta(result),
                            );

                        }
                    }),
                    initialData: 0
                })
                    .connectLive(
                        (number, actions) => (<div>
                            <button onClick={() => actions.incrementAsync()}>Increment!</button>
                            <button onClick={() => actions.decrementAsync()}>Decrement!</button>
                            <button onClick={() => actions.delta(-5)}>Delta -5</button>
                            <h1>{number}</h1>
                        </div>)
                    )

            }]
            }/>

        <h1>Best for complex state/async/orchestration</h1>
        <LineComponent
            desc={`Conan.controller`}
            boxes={[{
                description: `Conan.controller`,
                method1: `Conan.light<number>('conan.light', 0)`,
                method2: `actions.update`,
                counterElement: <span>TBI</span>
            },]
            }/>

    </div>)
}
