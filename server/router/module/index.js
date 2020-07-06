let moduleController = require("../../controller/module");

module.exports = [
    {
        method: "post",
        path: "/module",
        controller: moduleController.add
    },
    {
        method: "get",
        path: "/module",
        controller: moduleController.list
    },
    {
        method: "get",
        path: "/module/:id",
        controller: moduleController.detail
    },
    {
        method: "put",
        path: "/module/:id",
        controller: moduleController.update
    },
    {
        method: "delete",
        path: "/module/:id",
        controller: moduleController.del
    }
];
