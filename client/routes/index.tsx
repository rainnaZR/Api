import React from "react";
import { Route } from "react-router-dom";
import routes from "./config";

function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export { routes, RouteWithSubRoutes };
