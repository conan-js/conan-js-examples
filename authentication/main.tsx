import * as React from "react";
import * as ReactDom from "react-dom";
import {MainContainer} from "./src/front/main.container";
import {prodConf} from "./src/conf/prod";


ReactDom.render(
    <MainContainer
        {...prodConf}
    />,
    document.getElementById('root')
);
