const service = require("../index");

module.exports = {
    add: service("mock", "add"),
    detail: service("mock", "detail")
};
