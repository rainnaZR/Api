const service = require("../index");

module.exports = {
    add: service("interface", "add"),
    detail: service("interface", "detail"),
    update: service("interface", "update"),
    del: service("interface", "del")
    // list: service("module", "list"),
};
