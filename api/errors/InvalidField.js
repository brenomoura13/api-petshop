class InvalidField extends Error {
  constructor(field) {
    const mes = `Field '${field}' is invalid`;
    super(mes);
    this.name = "InvalidField";
    this.errorID = 1;
  }
}

module.exports = InvalidField;
