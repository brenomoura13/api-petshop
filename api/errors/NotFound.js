class NotFound extends Error {
  constructor() {
    super("Provider not found :(");
    this.name = "NotFound";
    this.errorID = 0;
  }
}

module.exports = NotFound;
