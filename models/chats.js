const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Chats = sequelize.define("chats", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  message: Sequelize.STRING,
});

module.exports = Chats;
