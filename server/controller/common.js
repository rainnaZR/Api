const { dataFormat } = require("../utils/index");

//成功的响应
const success = result => {
    return {
        code: 200,
        success: true,
        data: dataFormat(result),
        message: "操作成功"
    };
};

//失败的响应
const failed = error => {
    return {
        code: error.status || 500,
        message: error.message || "服务器异常"
    };
};

module.exports = {
    success,
    failed
};
