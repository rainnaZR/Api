let interfaceController = require("../../controller/interface");

module.exports = [
    {
        method: "post",
        path: "/interface",
        controller: interfaceController.add
    },
    {
        method: "get",
        path: "/interface/:id",
        controller: interfaceController.detail
    },
    {
        method: "put",
        path: "/interface/:id",
        controller: interfaceController.update
    },
    {
        method: "delete",
        path: "/interface/:id",
        controller: interfaceController.del
    }
];
