const Model = require("./ModelTabProvider");

module.exports = {
  getList() {
    return Model.findAll();
  },

  input(provider) {
    return Model.create(provider);
  },
};
