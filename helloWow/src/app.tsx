import * as React from "react";
import {Asaps, Conan} from "conan-js-core";


export function HelloWowApp(): React.ReactElement {
    const yetAnotherCounter$ = Conan.light<number>('counter', 0);

    return (<div>
        {yetAnotherCounter$.connectLive (
        (counterValue)=>(<h1>{counterValue}</h1>)
        )}
        <button onClick={()=>yetAnotherCounter$.do.update(3)}>
            setValueTo3
        </button>
        <button onClick={()=>yetAnotherCounter$.do.update(current=>++current)}>
            increase by one
        </button>
        <button onClick={()=>yetAnotherCounter$.do.updateAsap(
            Asaps.delayed(3, 3000)
        )}>
            setValueTo3 - asnyc
        </button>
        <button onClick={()=>yetAnotherCounter$.do.updateAsap(
            Asaps.delayed(()=>yetAnotherCounter$.getData() + 1, 3000)
        )}>
            increase by one - async
        </button>
        <h1>
        EVEN NUMBERS: {yetAnotherCounter$.filter(it=>it % 2 === 0).connectLive (
            (counterValue)=>(<span>{counterValue}</span>)
        )}
        </h1>
        <h1>
            DOUBLE: {yetAnotherCounter$.map(it=>it * 2).connectLive (
            (counterValue)=>(<span>{counterValue}</span>)
        )}
        </h1>
    </div>)
}
