const Koa = require("koa");
const path = require("path");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const config = require("./config/index.js");
const koaStatic = require("koa-static");
const routers = require("./router/index.js");
const chalk = require("chalk");
const app = new Koa();

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, "./public")));

//配置跨域
app.use(cors());

//body解析
app.use(bodyParser());
``;
//路由
app.use(routers.routes()) //启动路由
    .use(routers.allowedMethods());

//端口监听
app.listen(config.port, () => {
    console.log(chalk.cyan("服务已经启动\n"));
    console.log(chalk.cyan(`当前系统环境变量：${process.env.NODE_ENV}`));
    console.log(chalk.cyan(`listening on port ${config.port}`));
});

process.on("uncaughtException", err => {
    console.error(err);
});
