const TableModel = require("../routes/fornecedores/ModelTabProvider");

/* Creating tables in database*/

TableModel.sync()
  .then(() => console.log("Table successfully created"))
  .catch(console.log());
