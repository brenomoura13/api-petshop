const Model = require("./ModelTabProvider");
const NotFound = require("../../errors/NotFound");

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
      throw new NotFound("Provider not found :(");
    }
    return found;
  },

  update(id, data) {
    return Model.update(data, { where: { id: id } });
  },

  remove(id) {
    return Model.destroy({ where: { id: id } });
  },
};
