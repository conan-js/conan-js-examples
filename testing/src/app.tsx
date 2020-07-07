import * as React from "react";
import {Asaps, Conan, ICallback} from "conan-js-core";
import {StateEvent, StatusEventType} from "conan-js-core";

let asyncValue$ = Conan.light<number>(
    'test-async-number-value',
);

let numberValue$ = Conan.light<number>(
    'test-number-value',
    undefined
);

let timesIdle$ = Conan.light<number>('timesIdle', 0);

numberValue$.metaFlow.toState('idle').always(()=>
    timesIdle$.do.update(current=>++current)
);


export interface TestButtonProps {
    action: ICallback
    labels: [string, string]
}

export function TestButton({action, labels}: TestButtonProps): React.ReactElement {
    return <button
        style={{textAlign: "left"}}
        onClick={action}
    >
        <div><b>{labels[0]}</b></div>
        <div>{labels[1]}</div>
    </button>;
}

export function TestingApp(): React.ReactElement {
    return (<div>
        <h1>Testing synchronous values</h1>
        <p>All you have to do is to call getData() on the Conan.State after you perform all of your synchronous
            operations,
            in conan everything that is synchronous is kept synchronous</p>
        <TestButton
            labels={[
                'test - success',
                'counter$.do.update (3);'
            ]}
            action={() => {
                numberValue$.do.update(3);
            }}
        />
        <TestButton
            labels={[
                'test - fail',
                'counter$.do.update (5);'
            ]}
            action={() => {
                numberValue$.do.update(5);
            }}
        />
        {numberValue$.connectLive(value => (<div>
            <h3>Expected Value: 3</h3>
            <h3>Actual Value: {value}</h3>
            <h3>Result: {
                value === 3 ? 'pass' : 'fail'
            }</h3>
        </div>))}

        <h1>Testing asynchronous values</h1>
        <h2>Chaining</h2>
        <p>If you define your async actions using monitors, the return of your action would be an ASAP that you can use
        to test as soon as it is completed</p>
        <TestButton
            labels={[
                '1.5s-> (4)',
                'counter$.do.updateAsap (Asaps.delayed(4, 1500)).then...;'
            ]}
            action={() => numberValue$.do.updateAsap(
                Asaps.delayed(4, 1500),
                '1.5s-> (4)'
            ).then(asyncValue$.do.update)}
        />
        <TestButton
            labels={[
                '2.5s-> (3)',
                'counter$.do.updateAsap (Asaps.delayed(3, 2500)).then...;'
            ]}
            action={() => numberValue$.do.updateAsap(
                Asaps.delayed(3, 2500),
                '2.5s-> (3)'
            ).then(asyncValue$.do.update)}
        />

        <h3>updateAsap.then: Latest Async value [{asyncValue$.connectLive(data=>(<span>{data}</span>))}]</h3>

        <h1>Testing - getting events</h1>
        <p>You can check all events that have been raised on a Conan State by calling getEvents. To return only state
            events:
            you can pass options: eventTypes: [StatusEventType.STATE], excludeInit: true</p>
        <h3>latest values: {numberValue$.connectLive(() => (<div>
            {numberValue$.getEvents().serialize({
                eventTypes: [StatusEventType.STATE],
                excludeInit: true,
            })
                .map((it: StateEvent, i) => it.data != null ? it.data : '[undefined]')
                .join(', ')
            }
        </div>))}
        </h3>

        <h3>async state: {numberValue$.asyncState.connectLive((data)=> {
            let asyncOps = data.inProgressActions.map((it) => {
                return it.name
            }).join(', ');

            return (<div>
                current async ops: {asyncOps}
            </div>);
        })}
        </h3>



        <h1>Waiting for onIdle + transactions</h1>
        <p>If you need to perform many actions chained, and specially if some of them are async, it might be difficult to
        know when to test your state, with this in mind, you can listen to the idle state, but you will find out that
        in between operations, the conan state will be back to IDLE, so it would not really help to know when to run your tests
        (you are likely to be interested in the last idle).

        There is a handy method in ConanState for this: .transaction. When ran inside a transaction, only when all actions are
        completed including the async operation</p>

        <TestButton
            labels={[
                'open transaction',
                'counter$.openTransaction();'
            ]}
            action={() => numberValue$.openTransaction(`test-transaction`)}
        />
        <TestButton
            labels={[
                'close transaction',
                'counter$.closeTransaction();'
            ]}
            action={() => numberValue$.closeTransaction()}
        />



        <h3>{numberValue$.metaFlow.toStateAll().connectLive((data)=> <div>
            <div>current status:  {data.data.status}</div>
            <div>transactions open: {data.data.transactionCount}</div>
        </div>)}</h3>
        <h3>times idle: {timesIdle$.connectLive((data)=> (<span>{data}</span>))}</h3>

    </div>)
}
