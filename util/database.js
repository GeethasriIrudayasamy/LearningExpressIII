const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodeapp", "root", "commit", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
