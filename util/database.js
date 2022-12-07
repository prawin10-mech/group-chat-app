const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize("group_chat", "root", "Pandu@000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
