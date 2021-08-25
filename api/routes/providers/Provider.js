const providerTable = require("./ProviderTables");
const InvalidField = require("../../errors/InvalidField");
const DataNotProvided = require("../../errors/DataNotProvided");

class Provider {
  constructor({
    id,
    company,
    email,
    category,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    this.id = id;
    this.company = company;
    this.email = email;
    this.category = category;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  validate() {
    const data = ["company", "email", "category"];

    data.forEach((field) => {
      const value = this[field];

      if (typeof value !== "string" || value.length === 0) {
        throw new InvalidField(field);
      }
    });
  }

  async create() {
    this.validate();
    const result = await providerTable.input({
      company: this.company,
      email: this.email,
      category: this.category,
    });

    this.id = result.id;
    this.dataCriacao = result.dataCriacao;
    this.dataAtualizacao = result.dataAtualizacao;
    this.versao = result.versao;
  }

  async load() {
    const providerFound = await providerTable.getById(this.id);
    this.company = providerFound.company;
    this.email = providerFound.email;
    this.category = providerFound.category;
  }

  async update() {
    await providerTable.getById(this.id);
    const list = ["company", "email", "category"];
    const dataToUpdate = {};
    list.forEach((list) => {
      const value = this[list];
      if (typeof value === "string" && value.length > 0) {
        dataToUpdate[list] = value;
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      throw new DataNotProvided();
    }
    await providerTable.update(this.id, dataToUpdate);
  }

  remove() {
    return providerTable.remove(this.id);
  }
}

module.exports = Provider;
