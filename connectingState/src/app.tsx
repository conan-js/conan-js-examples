import * as React from "react";
import {CounterAppHOCMap} from "./components/connect/hoc/counter-hoc-map";
import {CounterAppHOCAll} from "./components/connect/hoc/counter-hoc-all";
import {CounterAppDirectAll} from "./components/connect/direct/counter-direct-all";
import {CounterAppDirectMap} from "./components/connect/direct/counter-direct-map";
import {CounterAppCompAll} from "./components/connect/composition/counter-comp-all";
import {CounterAppCompMap} from "./components/connect/composition/counter-comp-map";
import {CounterAppDirectRef} from "./components/connect/direct/counter-direct-ref";
import {CounterLiveAppDirectRef} from "./components/live/counter-direct-ref";
import {CounterLiveAppCompAll} from "./components/live/counter-comp-all";
import {CounterLiveAppHOCAll} from "./components/live/counter-hoc-all";
import {CounterCompHookContainerAll} from "./components/connect/hook/counter-hook-all";
import {CounterAppDirectData} from "./components/connect/direct/counter-direct-data";
import {LineComponent} from "./components/lineComponents";


export class ConnectingStateApp extends React.Component {
    render() {

        return (
            <>
                <h2>CONNECTING</h2>
                <LineComponent
                    desc={`HOC`}
                    boxes={[{
                        description: `CONNECTING ALL`,
                        method1: `<StateConnect/>`,
                        method2: `<ContextStateConnect/>`,
                        counterElement: <CounterAppHOCAll/>
                    }, {
                        description: `MAPPING PROPERTIES`,
                        method1: `<StateMapConnect/>`,
                        method2: `<ContextStateMapConnect/>`,
                        counterElement: <CounterAppHOCMap/>
                    },]
                    }/>
                <LineComponent
                    desc={`COMPOSITION`}
                    desc2={'BY REFERENCE'}
                    boxes={[{
                        description: `CONNECTING ALL`,
                        method1: `stateConnect (...)`,
                        method2: `contextStateConnect (...)`,
                        counterElement: <CounterAppCompAll/>
                    }, {
                        description: `MAPPING PROPERTIES`,
                        method1: `stateConnectMap (...)`,
                        method2: `contextStateConnectMap (...)`,
                        counterElement: <CounterAppCompMap/>
                    }]
                    }/>
                <LineComponent
                    desc2={`DIRECT`}
                    boxes={[{
                        description: `CONNECTING DATA (NEW)`,
                        method1: `state.connectData(...)`,
                        method2: `state.connectData(...)`,
                        counterElement: <CounterAppDirectData/>
                    },{
                        description: `CONNECTING ALL`,
                        method1: `state.connect(...)`,
                        method2: `state.connect(...)`,
                        counterElement: <CounterAppDirectAll/>
                    },{
                        description: `MAPPING PROPERTIES`,
                        method1: `state.connectMap(...)`,
                        method2: `state.connectMap(...)`,
                        counterElement: <CounterAppDirectMap/>
                    },{
                        description: `ACTIONS - DIRECT`,
                        method1: `state.do.xxx`,
                        method2: `state.connect(...)`,
                        counterElement: <CounterAppDirectRef/>
                    }]}
                />
                <LineComponent
                    desc={`HOOKS`}
                    desc2={`STATE`}
                    boxes={[{
                        description: `CONNECTING ALL`,
                        method1: `useConantState(...)`,
                        method2: `useContextConantState(...)`,
                        counterElement: <CounterCompHookContainerAll/>
                    }]}
                />

                <h2>LIVE RENDERING</h2>
                <LineComponent
                    boxes={[{
                        description: `HOC`,
                        method1: `<StateLive/>`,
                        method2: `<ContextStateLive/>`,
                        counterElement: <CounterLiveAppHOCAll/>
                    }, {
                        description: `COMPOSITION (REF)`,
                        method1: `stateLive (...)`,
                        method2: `contextStateLive (...)`,
                        counterElement: <CounterLiveAppCompAll/>
                    },{
                        description: `COMPOSITION (DIRECT)`,
                        method1: `state.live (...)`,
                        method2: `state.do.xxx`,
                        counterElement: <CounterLiveAppDirectRef/>
                    }]
                    }/>
            </>);
    }
}
