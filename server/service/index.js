const mysql = require("mysql");
const config = require("../config/index.js");
const debug = require("debug")("db");

/**
 * 添加一个测试mysql连接的例子，上线后可删除
 */
(function pingMysql() {
    const connection = mysql.createConnection({
        host: config.database.HOST,
        user: config.database.USERNAME,
        password: config.database.PASSWORD,
        database: config.database.DATABASE
    });

    connection.connect(function(err) {
        if (err) {
            console.error("mysql error connecting: " + err.stack);
            return;
        }

        debug("mysql connected as id " + connection.threadId);
    });
})();

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    multipleStatements: config.database.MUTIPLESTATEMENTS
});

const query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const con = connection.query(sql, values, (err, rows) => {
                    debug(con.sql);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = {
    query
};
