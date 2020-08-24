const service = require("../index");

module.exports = {
    add: service("interface", "add"),
    detail: service("interface", "detail"),
    update: service("interface", "update"),
    setStatus: service("interface", "setStatus"),
    del: service("interface", "del")
    // list: service("module", "list"),
};
