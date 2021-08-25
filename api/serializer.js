const ValueNotSupported = require("../../errors/ValueNotSupported");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serializer(data) {
    if (this.contentType === "application/json") {
      return this.json(data);
    }
    throw new ValueNotSupported(this.contentType);
  }
}
