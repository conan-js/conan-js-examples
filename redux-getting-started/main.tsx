import * as React from "react";
import * as ReactDom from "react-dom";
import {TodoListContainer} from "./src/todoList.container";


ReactDom.render(<TodoListContainer/>,
    document.getElementById('root')
);
