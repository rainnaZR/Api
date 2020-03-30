const service = require("../index");

module.exports = {
    add: service("module", "add"),
    list: service("module", "list"),
    detail: service("module", "detail"),
    update: service("module", "update"),
    del: service("module", "del")
};
