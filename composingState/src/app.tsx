import * as React from "react";
import {Reducers} from "conan-js-core";
import {Conan} from "conan-js-core";
import {ConanState} from "conan-js-core";
import {LineComponent} from "./components/lineComponents";

export interface ProductQtyReducers extends Reducers<ProductQty>{
    $incrementQty(): ProductQty;
    $decrementQty(): ProductQty;
}
export interface ProductQtyActions {
    incrementQty(): void;
    decrementQty(): void;
}

interface CombinedObject {
    qty: ProductQty,
    price: ProductUnitPrice
}

interface ProductQty {
    qty: number;
    id: string;
}

export interface ProductPriceReducers extends Reducers<ProductUnitPrice>{
    $incrementPriceBy10(): ProductUnitPrice;
    $decrementPriceBy10(): ProductUnitPrice;
}
export interface ProductPriceActions {
    incrementPriceBy10(): void;
    decrementPriceBy10(): void;
}

interface ProductUnitPrice {
    priceUsd: number;
    id: string;
}


export function ComposeStateApp(): React.ReactElement {
    const productQty$ = Conan.state<ProductQty, ProductQtyReducers, ProductQtyActions>({
            name: 'state$.pipeMap',
            reducers: getData => ({
                $decrementQty(): ProductQty {
                    return {...getData(), qty: getData().qty - 1};
                },
                $incrementQty(): ProductQty {
                    return {...getData(), qty: getData().qty + 1};
                }
            }),
            initialData: {
            qty: 1,
            id: 'a'
        }
    }
    );


    const productPrice$ = Conan.state<ProductUnitPrice, ProductPriceReducers, ProductPriceActions>({
        name: 'state$.pipeMap',
        reducers: getData => ({
            $decrementPriceBy10(): ProductUnitPrice {
                return {...getData(), priceUsd: getData().priceUsd - 10};
            },
            $incrementPriceBy10(): ProductUnitPrice {
                return {...getData(), priceUsd: getData().priceUsd + 10};
            }
        }),
        initialData: {
                priceUsd: 5,
                id: 'a'
            }
        }
    );

    return (<div>
        <h1>1 state</h1>
        <LineComponent
            desc={`[Pipe.map] 1 state => 1 state`}
            boxes={[{
                description: `[productQty$.mapPipe] => qty$`,
                method1: `pipeMap((data)=>data.aNumber)`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productQty$.map((productQty)=>productQty.qty).connectLive(
                    (qty) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement!</button>
                        <h1>quantity: {qty}</h1>
                    </div>)
                )
            },{
                description: `[productPrice$.mapPipe] => price$`,
                method1: `pipeMap((data)=>data.aNumber)`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productPrice$.map((price)=>price.priceUsd).connectLive(
                    (priceUsd) => (<div>
                        <button onClick={() => productPrice$.do.incrementPriceBy10()}>Increment!</button>
                        <button onClick={() => productPrice$.do.decrementPriceBy10()}>Decrement!</button>
                        <h1>price ($): {priceUsd}</h1>
                    </div>)
                )
            }]
        }/>

        <LineComponent
            desc={`[Pipe.filter] 1 state => 1 state`}
            boxes={[{
                description: `[productQty$.filter] => productQty.qty % 2 === 0`,
                method1: `productQty$.filter`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productQty$.filter((productQty) => productQty.qty % 2 === 0).connectLive(
                    (productQty) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement!</button>
                        <h1>EVEN quantity: {productQty ? productQty.qty : '-'}</h1>
                    </div>)
                )
            },{
                description: `[productQty$.filter] => productQty.qty % 2 !== 0`,
                method1: `productQty$.filter`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productQty$.filter((productQty)=>productQty.qty % 2 !== 0).connectLive(
                    (productQty) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement!</button>
                        <h1>ODD quantity: {productQty ? productQty.qty : '-'}</h1>
                    </div>)
                )
            }]
            }/>


        <h1>2 states</h1>
        <LineComponent
            desc={`[Pipe.merge] 2 state => 1 state`}
            boxes={[{
                description: `state$.pipeMerge`,
                method1: `productQty$.pipeMerge(productPrice$, (productQty, productPrice)=>[...])`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productQty$.merge<number, ProductUnitPrice>(
                    productPrice$,
                    (productQty, productPrice)=>productQty && productPrice ? productQty.qty * productPrice.priceUsd : 0
                ).connectLive(
                    (total) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment qty!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement qty!</button>
                        <button onClick={() => productPrice$.do.incrementPriceBy10()}>Increment price!</button>
                        <button onClick={() => productPrice$.do.decrementPriceBy10()}>Decrement price!</button>
                        <h1>total ($): {total}</h1>
                    </div>)
                )
            },{
                description: `state$.pipeTuple`,
                method1: `productQty$.pipeTuple(productPrice$)`,
                method2: `[...].do.incrementNumber() / [...].do.decrementNumber()`,
                counterElement: productQty$.tuple<ProductUnitPrice>(
                    productPrice$,
                ).connectLive(
                    ([qty, price]) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment qty!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement qty!</button>
                        <button onClick={() => productPrice$.do.incrementPriceBy10()}>Increment price!</button>
                        <button onClick={() => productPrice$.do.decrementPriceBy10()}>Decrement price!</button>
                        <h1>total ($): {qty.qty} * {price.priceUsd} = {qty.qty * price.priceUsd}</h1>
                    </div>)
                )
            }]
        }/>

        <h1>Many states</h1>
        <LineComponent
            desc={`[ConanState.combine] * state => 1 state`}
            boxes={[{
                description: `ConanState.combine`,
                method1: `{ price: productPrice$, qty: productQty$ }`,
                method2: ``,
                counterElement: ConanState.combine<CombinedObject>(
                    `combine`,
                    {
                        price: productPrice$,
                        qty: productQty$
                    }
                ).connectLive(
                    ({qty, price}) => (<div>
                        <button onClick={() => productQty$.do.incrementQty()}>Increment qty!</button>
                        <button onClick={() => productQty$.do.decrementQty()}>Decrement qty!</button>
                        <button onClick={() => productPrice$.do.incrementPriceBy10()}>Increment price!</button>
                        <button onClick={() => productPrice$.do.decrementPriceBy10()}>Decrement price!</button>
                        <h1>total ($): {qty.qty} * {price.priceUsd} = {qty.qty * price.priceUsd}</h1>
                    </div>)
                )

            },]
            }/>



    </div>)
}
