import React from "react";

interface BaseMenu {
    id?: string;
    name: string;
    path: string;
    component?: React.ComponentType;
    routes?: Array[BaseMenu];
    icon?: any;
    disabled?: boolean;
}

export interface RouteMenu extends BaseMenu {
    children?: BaseMenu[];
}

export interface ChildRouteMenu {
    [index: string]: RouteMenu;
}
