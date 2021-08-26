const ValueNotSupported = require("./errors/ValueNotSupported");

class Serialize {
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

class VendorSerializer extends Serialize {
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
}

module.exports = {
  Serialize: Serialize,
  VendorSerializer: VendorSerializer,
  AcceptedFormats: ["application/json"],
};
