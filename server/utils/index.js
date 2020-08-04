const dayjs = require("dayjs");
const keyFormat = string => {
    return string.replace(/_([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
};

const objFormat = (obj, char = "_") => {
    if (!obj || typeof obj !== "object") return;
    const keys = Object.keys(obj);
    keys.forEach(key => {
        const newKey = keyFormat(key);
        if (newKey !== key) {
            obj[newKey] = obj[key];
            delete obj[key];
        }
        objFormat(obj[newKey], char);
    });
    return obj;
};

/**
 * 将数据库返回记录的下划线分割字段，转化为驼峰字段
 * @param {(object[]|object)} data 数据库记录
 * @param {string} [char] 分隔符，默认'_'
 */
const dataFormat = (data, char = "-") => {
    if (!data) return;
    if (data instanceof Array && data.length > 0) {
        data.forEach(item => {
            //如果是数组，继续遍历
            if (item instanceof Array) {
                item = dataFormat(item);
            } else {
                item = objFormat(item);
            }
        });
    } else {
        data = objFormat(data);
    }

    return data;
};

const sqlUpdate = (params, sql) => {
    let keys = Object.keys(params);
    let arr = [];
    keys.forEach(key => {
        if (key) {
            sql = sql + `${key} = ? ,`;
            arr.push(params[key]);
        }
    });
    sql = sql.substring(0, sql.length - 1);
    return {
        args: arr,
        sql
    };
};

/**
 * 处理时间
 * **/

const dateFormat = (date, formatStr = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(date).format(formatStr);
};

module.exports = {
    dataFormat,
    sqlUpdate,
    dateFormat
};
