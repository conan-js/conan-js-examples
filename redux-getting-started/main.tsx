import * as React from "react";
import * as ReactDom from "react-dom";
import {TodoListConnector} from "./src/connectors/todoList.connector";


ReactDom.render(<TodoListConnector/>,
    document.getElementById('root')
);
