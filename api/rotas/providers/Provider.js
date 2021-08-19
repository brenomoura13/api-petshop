const providerTable = require("./ProviderTables");

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
  async create() {
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
}

module.exports = Provider;
