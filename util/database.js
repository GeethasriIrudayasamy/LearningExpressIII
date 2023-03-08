const mySql = require("mysql2");

const pool = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "nodeapp",
    password: "commit",
});
module.exports = pool.promise();
