let moduleController = require("../../controller/module");

module.exports = [
    {
        method: "post",
        path: "/modules",
        controller: moduleController.add
    },
    {
        method: "get",
        path: "/modules",
        controller: moduleController.list
    },
    {
        method: "get",
        path: "/modules/:id",
        controller: moduleController.detail
    },
    {
        method: "put",
        path: "/modules/:id",
        controller: moduleController.update
    },
    {
        method: "delete",
        path: "/modules/:id",
        controller: moduleController.del
    }
];
