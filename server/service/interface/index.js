const { query } = require("../index");
const { sqlUpdate } = require("../../utils/index");
const { STATUS } = require("../constants");

//新增
const add = val => {
    const {
        projectId,
        moduleId,
        label,
        requestUrl,
        requestMethod,
        requestParams,
        requestResponse
    } = val;
    const sql =
        "INSERT INTO tbl_api_interface(Id, project_id, module_id, label, request_url, request_method, request_params, request_response, create_time, interface_status) VALUES(0,?,?,?,?,?,?,?,now(),1)";

    return query(sql, [
        projectId,
        moduleId,
        label,
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

// //根据id查询
// const detail = val => {
//     const { id } = val;
//     const sql = "select * from tbl_api_module where id = ?";
//     return query(sql, [id]).then(res => {
//         const { id, label, introduce, project_id } = res[0];
//         return {
//             id,
//             label,
//             introduce,
//             projectId: project_id
//         };
//     });
// };

// //更新
// const update = val => {
//     const { id, label, introduce, projectId } = val;
//     let _sql = "update tbl_api_module set ";
//     const { sql, args } = sqlUpdate(
//         { id, label, introduce, project_id: projectId },
//         _sql
//     );
//     _sql = sql + "where id = ?";

//     return query(_sql, [...args, id]);
// };

// //删除
// const del = val => {
//     const { id } = val;
//     const sql = "update tbl_api_module set module_status = ? where id = ?";
//     return query(sql, [STATUS.INVALID, id]);
// };

module.exports = {
    add
    // list,
    // detail,
    // update,
    // del
};
