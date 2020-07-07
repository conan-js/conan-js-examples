import * as React from "react";
import {Reducers} from "conan-js-core";
import {Conan} from "conan-js-core";
import {IKeyValuePairs} from "conan-js-core";
import {Objects} from "conan-js-core";

export interface ProductPriceReducers extends Reducers<ProductUnitPrice>{
    $incrementPriceBy10(): ProductUnitPrice;
    $decrementPriceBy10(): ProductUnitPrice;
}
interface ProductUnitPrice {
    priceUsd: number;
    id: string;
}


export function OrchestratingStateApp(): React.ReactElement {
    interface StockAlert {
        operation: 'buy' | 'sell' | 'keep',
        stockSnapshot: StockPrice,
        orderSnapshot: StockOrder,
        timestamp: number
    }

    interface StockPrice {
        id: string,
        price: number,
    }

    interface StockOrder {
        stockId: string,
        sell: number,
        buy: number,
    }

    const market$ = Conan.light<StockPrice[]>('market', [{
        id: 'TSLA',
        price: 1000
    },{
        id: 'AAPL',
        price: 350
    }]);

    const stockOrder$ = Conan.light<StockOrder[]>('stockOrders', [{
        stockId: 'AAPL',
        buy: 300,
        sell: 400
    },{
        stockId: 'TSLA',
        buy: 900,
        sell: 1200
    }]);

    function changeStockPrice (stockId: string, delta: number) {
        market$.do.update(current=>
            current.map(it=>{
                let newValue = it.price + delta;
                return it.id !== stockId ?
                    it :
                    {...it, price: newValue > 0 ? newValue : 0};
            })
        )
    }

    function changeStockOrder (stockId: string, delta: number, toChange: 'buy' | 'sell') {
        stockOrder$.do.update(current=>
            current.map(it=> {
                let newValue = it[toChange] + delta;
                return it.stockId !== stockId ?
                        it :
                        {...it, [toChange]: newValue > 0 ? newValue : 0};
                }
            )
        )
    }


    const alertsByStock$ = Conan.light<IKeyValuePairs<StockAlert[]>>('alerts', {});

    const alertStream$ = alertsByStock$.map<StockAlert[]>(alertsByStock => {
        let newStream: StockAlert[] = [];
        Objects.foreachEntry(alertsByStock, (stockAlerts)=>newStream = [...newStream, ...stockAlerts])
        return newStream.sort((left, right)=>left.timestamp - right.timestamp);
    });




    stockOrder$.tuple(market$).addDataReaction({
        name: `checking alerts`,
        dataConsumer: ([stockOrders, stocks])=> {
            let newAlerts: StockAlert[] = [];
            stockOrders.forEach(stockOrder=>{
                const stock = stocks.find(it=>it.id === stockOrder.stockId);
                let operation: 'buy' | 'sell' | 'keep';
                if (stock.price >= stockOrder.sell) {
                    operation= 'sell';
                } else if (stock.price <= stockOrder.buy) {
                    operation= 'buy';
                } else {
                    operation= 'keep';
                }
                newAlerts.push({
                    operation,
                    orderSnapshot: stockOrder,
                    stockSnapshot: stock,
                    timestamp: Date.now()
                })
            });

            let nextState: IKeyValuePairs<StockAlert[]> = {...alertsByStock$.getData()};
            newAlerts.forEach(newAlert=>{
                if (nextState[newAlert.stockSnapshot.id] == null){
                    nextState[newAlert.stockSnapshot.id] = [newAlert];
                }  else {
                    let alertsForStock:StockAlert[] = nextState[newAlert.stockSnapshot.id];
                    let lastAlert = alertsForStock[alertsForStock.length -1];
                    if (
                        !Objects.deepEquals(newAlert.stockSnapshot, lastAlert.stockSnapshot) ||
                        !Objects.deepEquals(newAlert.orderSnapshot, lastAlert.orderSnapshot)
                    ){
                        alertsForStock.push(newAlert);
                    }
                }
            })

            alertsByStock$.do.update(nextState);
        }
    })

    return (<div>
        <h1>PRICES</h1>
        {market$.connectLive( stockPrices=> (
            <ul>
                {stockPrices.map(stockPrice=>(
                    <li>{stockPrice.id} - {stockPrice.price}$ &nbsp;
                        <button onClick={()=>changeStockPrice(stockPrice.id, +10)}>+10</button>
                        <button onClick={()=>changeStockPrice(stockPrice.id, +100)}>+100</button>
                        <button onClick={()=>changeStockPrice(stockPrice.id, -10)}>-10</button>
                        <button onClick={()=>changeStockPrice(stockPrice.id, -100)}>-100</button>
                    </li>
                ))}
            </ul>
        ))}
        <h1>ORDERS</h1>
        {stockOrder$.connectLive(stockOrders=>(
            <ul>
                {stockOrders.map(stockOrder=><li>
                    {stockOrder.stockId} <br/>
                    BUY: {stockOrder.buy} &nbsp;
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, +10, 'buy')}>+10</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, +100, 'buy')}>+100</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, -10, 'buy')}>-10</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, -100, 'buy')}>-100</button>
                    <br/>
                    SELL: {stockOrder.sell} &nbsp;
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, +10, 'sell')}>+10</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, +100, 'sell')}>+100</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, -10, 'sell')}>-10</button>
                    <button onClick={()=>changeStockOrder(stockOrder.stockId, -100, 'sell')}>-100</button>
                    <br/>
                </li>)}
            </ul>
        ))}

        <h1>ALERTS</h1>
        {alertStream$.connectLive((stockAlerts)=>(
            <ul>
                {stockAlerts.reverse().map(it=><li>
                    {it.operation} - {it.stockSnapshot.id} - {it.stockSnapshot.price} [{
                        it.operation === 'buy'? it.orderSnapshot.buy :
                        it.operation === 'sell'? it.orderSnapshot.sell :
                        `${it.orderSnapshot.buy}/${it.orderSnapshot.sell}`}
                    ]
                </li>)}
            </ul>
        ))}
    </div>)
}
