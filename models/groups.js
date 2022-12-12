const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Groups = sequelize.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  groupName: Sequelize.STRING,
});

module.exports = Groups;
