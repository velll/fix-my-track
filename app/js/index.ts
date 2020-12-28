import * as ReactDOM from "react-dom";
import * as React from "react";

import { App } from "./components/App";

console.log('hello');

const e = React.createElement;
const app = ReactDOM.render(e(App, {}), document.getElementById("starter"));

(window as any).app = app;
