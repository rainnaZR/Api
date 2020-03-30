const { mysql } = require("./db");
const { server } = require("./api");

const config = {
    // 启动端口
    port: 1768,

    // 数据库配置
    database: mysql,

    server
};

module.exports = config;
