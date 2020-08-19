const { query } = require("../index");
const { STATUS } = require("../constants");

const add = val => {};

const detail = val => {
    const { projectId, url } = val;
    const sql =
        "select * from tbl_api_interface where project_id = ? and request_url = ? and interface_status != ?";

    return query(sql, [Number(projectId), `/${url}`, STATUS.INVALID]).then(
        res => {
            return res && res[0];
        }
    );
};

module.exports = {
    add,
    detail
};
