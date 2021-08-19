const Sequilize = require("sequelize");
const config = require("config");

/* config in config/default.json*/

/* mysql -u root -h 127.0.0.1 -p      >      create database name */

const instance = new Sequilize(
  config.get("mysql.bd"),
  config.get("mysql.user"),
  config.get("mysql.pass"),
  {
    host: config.get("mysql.host"),
    dialect: "mysql",
  }
);

module.exports = instance;
