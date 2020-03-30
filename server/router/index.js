const Router = require("koa-router");
const router = new Router();
const routers = require("./list.js");

routers.forEach(item => {
    router[item.method](item.path, item.controller);
});

module.exports = router;
