import * as React from "react";
import {CSSProperties} from "react";

const exampleBox: CSSProperties = {
    border: `2px solid black`,
    margin: `5px`,
    padding: `10px`,
    width: `300px`,
}

const flexRows: CSSProperties = {
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "flex-start",
    "alignItems": "stretch",
    "alignContent": "stretch",
}

interface BoxProperties {
    description: string,
    method1: string,
    method2: string,
    counterElement: React.ReactElement,
}

const BoxComponent = (props: BoxProperties): React.ReactElement => (
    <div style={exampleBox}>
        <span>{props.description}</span>
        <ul>
            <li><code>{props.method1}</code></li>
            <li><code>{props.method2}</code></li>
        </ul>

        {props.counterElement}
    </div>
);


interface LineProperties {
    desc?: string;
    desc2?: string;
    boxes: BoxProperties[];
}

export const LineComponent = ({boxes, desc, desc2}: LineProperties): React.ReactElement<LineProperties> => (
    <div>
        {desc && <h3><b>{desc}</b></h3>}
        {desc2 && <h4>{desc2}</h4>}
        <div style={flexRows}>
            {boxes.map((boxProps, i)=><BoxComponent {...boxProps} key={i}/>)}
        </div>
    </div>
)
