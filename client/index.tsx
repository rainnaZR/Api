import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./utils/serviceWorker";
import "element-react";
import "element-theme-default";
import "./style/reset.scss";
import "./style/base.scss";
import "./style/unit.scss";
import "./style/module.scss";
import "./style/elementUi.scss";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
