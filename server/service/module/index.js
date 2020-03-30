const { query } = require("../index");
const { sqlUpdate } = require("../../utils/index");
const { STATUS } = require("../constants");

//新增
const add = val => {
    const { label, introduce, projectId } = val;
    const sql =
        "INSERT INTO tbl_api_module(Id,label,introduce,project_id,create_time,module_status) VALUES(0,?,?,?,now(),1)";

    return query(sql, [label, introduce, projectId]).then(res => {
        return {
            id: res.insertId
        };
    });
};

//查询
const list = val => {
    const { projectId } = val;
    let sql =
        "select SQL_CALC_FOUND_ROWS * from tbl_api_module where module_status != ? and project_id = ? order by id asc;SELECT FOUND_ROWS();";
    let value = [STATUS.INVALID, projectId];
    return query(sql, value).then(res => {
        const list = res[0];
        let promises = [];
        list.map(item => {
            promises.push(getApi(item));
        });
        return Promise.all(promises).then(res => {
            return {
                list: res
            };
        });
    });
};

const getApi = item => {
    const id = item.id;
    const sql = "select * from tbl_api_interface where module_id = ?";
    return query(sql, [id]).then(res => {
        return {
            id: item.id,
            label: item.label,
            children: res
        };
    });
};

//根据id查询
const detail = val => {
    const { id } = val;
    const sql = "select * from tbl_api_module where id = ?";
    return query(sql, [id]).then(res => {
        const { id, label, introduce, project_id } = res[0];
        return {
            id,
            label,
            introduce,
            projectId: project_id
        };
    });
};

//更新
const update = val => {
    const { id, label, introduce, projectId } = val;
    let _sql = "update tbl_api_module set ";
    const { sql, args } = sqlUpdate(
        { id, label, introduce, project_id: projectId },
        _sql
    );
    _sql = sql + "where id = ?";

    return query(_sql, [...args, id]);
};

//删除
const del = val => {
    const { id } = val;
    const sql = "update tbl_api_module set module_status = ? where id = ?";
    return query(sql, [STATUS.INVALID, id]);
};

module.exports = {
    add,
    list,
    detail,
    update,
    del
};
