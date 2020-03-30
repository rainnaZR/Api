const { success, failed } = require("./common");

module.exports = (file, name, resFunc) => {
    const service = require(`../service/${file}`);

    return async ctx => {
        let response;
        try {
            //将body里的值和query里的值合并
            const val = {
                ...ctx.request.body,
                ...ctx.request.query,
                ...ctx.params,
                sessionUser: ctx.user
            };
            await service[name](val).then(result => {
                //处理返回结果
                if (resFunc && typeof resFunc == "function") {
                    response = resFunc(result, val);
                } else {
                    response = success(result);
                }
            });
        } catch (err) {
            response = failed(err);
        }
        ctx.body = response;
    };
};
