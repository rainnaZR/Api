let mockController = require("../../controller/mock");

module.exports = [
    {
        method: "post",
        path: "/mock/:projectId(\\d+)/:url(.+)",
        controller: mockController.add
    },
    {
        method: "get",
        path: "/mock/:projectId(\\d+)/:url(.+)",
        controller: mockController.detail
    }
];
