import * as React from "react";
import {Reducers} from "conan-js-core";

export interface ProductPriceReducers extends Reducers<ProductUnitPrice>{
    $incrementPriceBy10(): ProductUnitPrice;
    $decrementPriceBy10(): ProductUnitPrice;
}
interface ProductUnitPrice {
    priceUsd: number;
    id: string;
}


export function ScopingStateApp(): React.ReactElement {
    return (<div>
        <h1>SCOPING</h1>
        <h2>Global</h2>
        <p>You can have global state just by exporting it and then importing it, or in a simmilar fashion by adding your state
         to you application context (DI)</p>
        <h2>Local</h2>
        <p>You can have local state to your component by just declaring it and using it locally to your component</p>
        <h2>Context</h2>
        <p>The moment you connect state, is stored in the context, this means that you can use the context state</p>
        <h2>Runtime</h2>
        <p>Many times you wil find that you want to generate state not statically but based on the actual context of the app. When this happens, you have different mechanisms
            For instance you could generate a new state as pass it as props to a component. Or you could leverage a derived DI context (to be documented)
        </p>
    </div>)
}
