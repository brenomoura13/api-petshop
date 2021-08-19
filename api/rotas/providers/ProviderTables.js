const Model = require("./ModelTabProvider");
module.exports = {
  getList() {
    return Model.findAll();
  },
};
