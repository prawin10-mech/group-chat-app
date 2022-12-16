const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Archived = sequelize.define("archivedchats", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  message: Sequelize.STRING,
});

module.exports = Archived;
