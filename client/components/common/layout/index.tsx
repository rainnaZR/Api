import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { routes, RouteWithSubRoutes } from "../../../routes";
import Header from "../header";
import Footer from "../footer";
import "./index.scss";

export default function() {
    return (
        <div className="g-body">
            <Router>
                <div className="g-header">
                    <Header />
                </div>
                <div className="g-main">
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
                <div className="g-footer">
                    <Footer />
                </div>
            </Router>
        </div>
    );
}
