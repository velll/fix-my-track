import * as ReactDOM from "react-dom";
import * as React from "react";

import Root from "./components/Root";


console.log('hello');

const e = React.createElement;
const app = ReactDOM.render(e(Root, {}), document.getElementById("starter"));

(window as any).app = app;
// (window as any).map = map;
