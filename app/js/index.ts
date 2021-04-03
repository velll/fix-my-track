import * as ReactDOM from "react-dom";
import * as React from "react";

import Root from "./components/Root";

const e = React.createElement;
const app = ReactDOM.render(e(Root, {}), document.getElementById("starter"));
