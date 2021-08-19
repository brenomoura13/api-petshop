const Model = require("./ModelTabProvider");

module.exports = {
  getList() {
    return Model.findAll();
  },

  input(provider) {
    return Model.create(provider);
  },

  async getById(id) {
    const found = await Model.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new Error("Provider not found :(");
    }
    return found;
  },

  update(id, data) {
    return Model.update(data, { where: { id: id } });
  },
};
