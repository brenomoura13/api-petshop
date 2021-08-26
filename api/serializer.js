const ValueNotSupported = require("./errors/ValueNotSupported");

class Serialize {
  json(data) {
    return JSON.stringify(data);
  }

  serializer(data) {
    if (this.contentType === "application/json") {
      return this.json(this.filter(data));
    }
    throw new ValueNotSupported(this.contentType);
  }

  filterObject(data) {
    const newObj = {};
    this.publicField.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        newObj[field] = data[field];
      }
    });
    return newObj;
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map((item) => {
        return this.filterObject(item);
      });
    } else {
      data = this.filterObject(data);
    }
    return data;
  }
}

class VendorSerializer extends Serialize {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.publicField = ["id", "company", "category"];
  }
}

module.exports = {
  Serialize: Serialize,
  VendorSerializer: VendorSerializer,
  AcceptedFormats: ["application/json"],
};
