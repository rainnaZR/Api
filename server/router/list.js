const project = require("./project/index");
const _module = require("./module/index");
const interface = require("./interface/index");
const mock = require("./mock/index");

module.exports = [...project, ..._module, ...interface, ...mock];
