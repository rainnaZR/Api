const env = process.env.NODE_ENV || "localhost";

const server = {
    dev: "http://xxx.com",
    localhost: "http://xxx.com"
}[env];

module.exports = {
    server
};
