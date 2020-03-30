const env = process.env.NODE_ENV || "localhost";

const mysql = {
    localhost: {
        DATABASE: "api_test",
        USERNAME: "root",
        PASSWORD: "1234567890",
        HOST: "localhost",
        PORT: 3306,
        MUTIPLESTATEMENTS: true,
        insecureAuth: true
    },
    dev: {
        DATABASE: "api_test",
        USERNAME: "root",
        PASSWORD: "1234567890",
        HOST: "localhost",
        PORT: 3306,
        MUTIPLESTATEMENTS: true,
        insecureAuth: true
    }
}[env];

module.exports = {
    mysql
};
