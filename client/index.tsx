import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./utils/serviceWorker";
import "element-react";
import "element-theme-default";
import "./style/reset.scss";
import "./style/base.scss";
import "./style/unit.scss";
import "./style/element.scss";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
