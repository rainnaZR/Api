const service = require("../index");

module.exports = {
    add: service("project", "add"),
    list: service("project", "list"),
    detail: service("project", "detail"),
    update: service("project", "update"),
    del: service("project", "del")
};
