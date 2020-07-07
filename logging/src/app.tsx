import * as React from "react";
import {Conan, IReducer} from "conan-js-core";
import {
    getLoggingFilter,
    LoggerFilters,
    setLoggingFilter,
    updateLoggingFilter
} from "conan-js-core";
import {Rule} from "conan-js-core";
import {FlowEvent, FlowEventType} from "conan-js-core";


export function LoggingApp(): React.ReactElement {

    let numberState1$ = Conan.light('number1', 0);
    let numberState2$ = Conan.light('number2', 0);
    let loggingFilterName$ = Conan.light('filter name', getLoggingFilter().name);


    const setNewLogging= (logger: Rule<FlowEvent>)=> {
        loggingFilterName$.do.update(logger.name);
        setLoggingFilter(logger);
    }

    const updateLogging= (logger: IReducer<Rule<FlowEvent>>)=> {
        let flowEventRule = updateLoggingFilter(logger);
        loggingFilterName$.do.update(flowEventRule.name);
    }

    const printButtons= (operator, actions): React.ReactElement => (
        <>{actions.map((action, i)=>
            <button key={i} onClick={()=>updateLogging(current => current[operator](action[1]))}>{operator.toUpperCase()} {action[0]}</button>
        )}</>
    )

    const printButtonsSection= (toPrint): React.ReactElement => (
        <div key={toPrint[0]}>
            <h3>{toPrint[0]}</h3>
            {['or', 'and'].map (condition=>(
                <div key={condition}>
                    <b>{condition.toUpperCase()}</b>
                    {printButtons (condition, toPrint[1])}
                </div>
            ))}
        </div>
    )

    return (<div>
        <h1>Specifying what to log globally</h1>
        <h2>Currently logging:</h2>
        {loggingFilterName$.connectLive(data=>(
            <span>{data}</span>
        ))}

        <h2>Choose something to log:</h2>
        <h3>Absolutely</h3>
        <button onClick={()=>setNewLogging(LoggerFilters.never())}>never</button>
        <button onClick={()=>setNewLogging(LoggerFilters.default())}>default</button>
        <button onClick={()=>setNewLogging(LoggerFilters.allExceptTraces())}>all except traces</button>
        <button onClick={()=>setNewLogging(LoggerFilters.all())}>all</button>

        {[
            ['Based on the status', [
                ['initialising', LoggerFilters.initialising()],
                ['nextData', LoggerFilters.nextData()]
            ]],
            ['Based on the nature', [
                ['main', LoggerFilters.main()],
                ['aux', LoggerFilters.aux()],
                ['helper', LoggerFilters.helper()],
                ['async', LoggerFilters.async()],
            ]],
            ['Based on the logging level', [
                ['milestone', LoggerFilters.milestone()],
                ['info', LoggerFilters.info()],
                ['debug', LoggerFilters.debug()],
                ['trace', LoggerFilters.trace()],
            ]],
            ['Based on the conan state name', [
                ['number1', LoggerFilters.mainLogName('number1')],
                ['number2', LoggerFilters.mainLogName('number2')],
            ]],
            ['Based on the event type (not all listed here)', [
                ['PROCESSING_REACTIONS', LoggerFilters.eventType(FlowEventType.PROCESSING_REACTIONS)],
                ['ADDING_REACTION', LoggerFilters.eventType(FlowEventType.ADDING_REACTION)],
                ['USER_CODE', LoggerFilters.eventType(FlowEventType.USER_CODE)],
                ['USER_REACTIONS', LoggerFilters.eventType(FlowEventType.USER_REACTIONS)],
            ]],
        ].map(printButtonsSection)}


        <h2>Open your console, clean it, and check here to see the logging:</h2>

        <button onClick={()=>numberState1$.do.update(value=>++value)}>increase number1</button>
        {numberState1$.connectLive(data=>(
            <h1>Number 1: {data}</h1>
        ))}

        <button onClick={()=>numberState2$.do.update(value=>++value)}>increase number2</button>
        {numberState2$.connectLive(data=>(
            <h1>Number 2: {data}</h1>
        ))}
    </div>)
}
