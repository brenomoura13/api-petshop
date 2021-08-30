const ValueNotSupported = require("./errors/ValueNotSupported");
const jsontoxml = require("jsontoxml");

class Serialize {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    let tag = this.singularTag;
    if (Array.isArray(data)) {
      tag = this.pluralTag;
      data = data.map((item) => {
        return { [this.singularTag]: item };
      });
    }
    return jsontoxml({ [tag]: data });
  }

  serializer(data) {
    data = this.filter(data);
    if (this.contentType === "application/json") {
      return this.json(data);
    }

    if (this.contentType === "application/xml") {
      return this.xml(data);
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
  constructor(contentType, extras) {
    super();
    this.contentType = contentType;
    this.publicField = ["id", "company", "category"].concat(extras || []);
    this.singularTag = "provider";
    this.pluralTag = "providers";
  }
}

class ErrorsSerializer extends Serialize {
  constructor(contentType, extras) {
    super();
    this.contentType = contentType;
    this.publicField = ["id", "message"].concat(extras || []);
    this.singularTag = "error";
    this.pluralTag = "errors";
  }
}

module.exports = {
  Serialize: Serialize,
  VendorSerializer: VendorSerializer,
  ErrorsSerializer: ErrorsSerializer,
  AcceptedFormats: ["application/json", "application/xml"],
};
