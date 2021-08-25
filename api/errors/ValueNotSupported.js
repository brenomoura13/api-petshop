class ValueNotSupported extends Error {
  constructor(contentType) {
    super(`'${contentType}' is not supported`);
    this.name = "ValueNotSupported";
    this.errorID = 3;
  }
}
