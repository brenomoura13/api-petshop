const Sequilize = require("sequelize");
const instance = require("../../bd");

const columns = {
  company: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequilize.ENUM("foods", "toys"),
    allowNull: false,
  },
};

const options = {
  freezeTableName: true,
  tableName: "providers",
  timestamps: true,
  createdAt: "dataCriacao",
  updatedAt: "dataAtualizacao",
  version: "versao",
};

module.exports = instance.define("providers", columns, options);
