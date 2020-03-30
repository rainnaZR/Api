let interfaceController = require("../../controller/interface");

module.exports = [
    {
        method: "post",
        path: "/interfaces",
        controller: interfaceController.add
    }
];
