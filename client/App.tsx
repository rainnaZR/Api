import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";
import Login from "./components/pages/login";
import Layout from "./components/common/layout";

const history = createBrowserHistory();

const App: React.FC = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="*" component={Layout} />
        </Switch>
    </Router>
);

export { App as default };
