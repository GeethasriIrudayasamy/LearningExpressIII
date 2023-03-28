const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodeapp", "root", "Peppers@1t", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
