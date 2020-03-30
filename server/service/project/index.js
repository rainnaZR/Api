const { query } = require("../index");
const { sqlUpdate } = require("../../utils/index");
const { STATUS } = require("../constants");

//新增
const add = val => {
    const { name, introduce, gitPath, createUser } = val;
    const sql =
        "INSERT INTO tbl_api_project(Id,name,introduce,git_path,create_user,create_time,project_status) VALUES(0,?,?,?,?,now(),1)";

    return query(sql, [name, introduce, gitPath, createUser]).then(res => {
        return {
            id: res.insertId
        };
    });
};

//查询
const list = val => {
    let sql =
        "select SQL_CALC_FOUND_ROWS * from tbl_api_project where project_status != ? order by id asc;SELECT FOUND_ROWS();";
    let value = [STATUS.INVALID];
    return query(sql, value).then(res => {
        return {
            list: res[0],
            pager: {
                total_size: res[1][0]["FOUND_ROWS()"]
            }
        };
    });
};

//根据id查询
const detail = val => {
    const { id } = val;
    const sql = "select * from tbl_api_project where id = ?";
    return query(sql, [id]).then(res => {
        const { id, name, introduce, git_path, create_user } = res[0];
        return {
            id,
            name,
            introduce,
            gitPath: git_path,
            createUser: create_user
        };
    });
};

//更新
const update = val => {
    const { id, name, introduce, gitPath, createUser } = val;
    let _sql = "update tbl_api_project set ";
    const { sql, args } = sqlUpdate(
        { id, name, introduce, git_path: gitPath, create_user: createUser },
        _sql
    );
    _sql = sql + "where id = ?";

    return query(_sql, [...args, id]);
};

//删除
const del = val => {
    const { id } = val;
    const sql = "update tbl_api_project set project_status = ? where id = ?";
    return query(sql, [STATUS.INVALID, id]);
};

module.exports = {
    add,
    list,
    detail,
    update,
    del
};
