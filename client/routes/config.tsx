import { RouteMenu } from "../types/route";
import Project from "../components/pages/project";
import Interface from "../components/pages/interface";
import Login from "../components/pages/login";
import Modal from "../components/pages/modal";
import Message from "../components/pages/message";

const routes: RouteMenu[] = [
    {
        id: "login",
        name: "登录",
        path: "/login",
        component: Login
    },
    {
        id: "project",
        name: "项目",
        path: "/project",
        component: Project
    },
    {
        id: "detail",
        name: "接口详情",
        path: "/detail/:projectId",
        component: Interface
    },
    {
        id: "modal",
        name: "数据",
        path: "/modal/:projectId/:modalId",
        component: Modal
    },
    {
        id: "message",
        name: "消息",
        path: "/message",
        component: Message
    }
];

export default routes;
