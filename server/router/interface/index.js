let interfaceController = require("../../controller/interface");

module.exports = [
    {
        method: "post",
        path: "/interface",
        controller: interfaceController.add
    }
];
