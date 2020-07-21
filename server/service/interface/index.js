const { query } = require("../index");
const { sqlUpdate, dateFormat } = require("../../utils/index");
const { STATUS } = require("../constants");

//新增
const add = val => {
    const {
        projectId,
        moduleId,
        label,
        introduce,
        tag,
        requestUrl,
        requestMethod,
        requestParams,
        requestResponse
    } = val;
    const sql =
        "INSERT INTO tbl_api_interface(Id, project_id, module_id, label, introduce, tag, request_url, request_method, request_params, request_response, create_time, interface_status) VALUES(0,?,?,?,?,?,?,?,?,?,now(),1)";

    if (!projectId) {
        return new Promise((resolve, reject) => {
            reject({
                message: "项目id不能为空"
            });
        });
    }
    if (!moduleId) {
        return new Promise((resolve, reject) => {
            reject({
                message: "模块id不能为空"
            });
        });
    }
    return query(sql, [
        projectId,
        moduleId,
        label,
        introduce,
        tag,
        requestUrl,
        requestMethod,
        requestParams,
        requestResponse
    ]).then(res => {
        return {
            id: res.insertId
        };
    });
};

//根据id查询
const detail = val => {
    const { id } = val;
    const sql = "select * from tbl_api_interface where id = ?";
    return query(sql, [id]).then(res => {
        return {
            ...res[0],
            create_time: dateFormat(res[0].create_time),
            update_time: dateFormat(res[0].update_time || Date.now())
        };
    });
};

//更新
const update = val => {
    const {
        id,
        projectId,
        moduleId,
        label,
        introduce,
        tag,
        requestUrl,
        requestMethod,
        requestParams,
        requestResponse
    } = val;
    let _sql = "update tbl_api_interface set ";
    let { sql, args } = sqlUpdate(
        {
            project_id: projectId,
            module_id: moduleId,
            label,
            introduce,
            tag,
            request_url: requestUrl,
            request_method: requestMethod,
            request_params: requestParams,
            request_response: requestResponse,
            update_time: dateFormat(Date.now())
        },
        _sql
    );
    _sql = sql + "where id = ?";

    return query(_sql, [...args, id]);
};

//删除
const del = val => {
    const { id } = val;
    const sql =
        "update tbl_api_interface set interface_status = ? where id = ?";
    return query(sql, [STATUS.INVALID, id]);
};

//查询
// const list = val => {
//     let sql =
//         "select SQL_CALC_FOUND_ROWS * from tbl_api_module where module_status != ? order by id asc;SELECT FOUND_ROWS();";
//     let value = [STATUS.INVALID];
//     return query(sql, value).then(res => {
//         return {
//             list: res[0],
//             pager: {
//                 total_size: res[1][0]["FOUND_ROWS()"]
//             }
//         };
//     });
// };

module.exports = {
    add,
    detail,
    update,
    del
    // list
};
