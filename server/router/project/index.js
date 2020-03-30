let projectController = require("../../controller/project");

module.exports = [
    {
        method: "post",
        path: "/projects",
        controller: projectController.add
    },
    {
        method: "get",
        path: "/projects",
        controller: projectController.list
    },
    {
        method: "get",
        path: "/projects/:id",
        controller: projectController.detail
    },
    {
        method: "put",
        path: "/projects/:id",
        controller: projectController.update
    },
    {
        method: "delete",
        path: "/projects/:id",
        controller: projectController.del
    }
];
