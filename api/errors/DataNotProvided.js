class DataNotProvided extends Error {
  constructor() {
    super("Insufficient data");
    this.name = "DataNotProvided";
    this.erroID = 2;
  }
}

module.exports = DataNotProvided;
