const express = require("express");
const app = express();
const config = require("config");
const router = require("./routes/providers");
const NotFound = require("./errors/NotFound");
const InvalidField = require("./errors/InvalidField");
const DataNotProvided = require("./errors/DataNotProvided");
const ValueNotSupported = require("./errors/ValueNotSupported");
const AcceptedFormats = require("./serializer").AcceptedFormats;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  let requiredFormat = req.header("Accept");

  if (requiredFormat === "*/*") {
    requiredFormat = "application/json";
  }

  if (AcceptedFormats.indexOf(requiredFormat) === -1) {
    res.status(406);
    res.end();
    return;
  }

  res.setHeader("Content-Type", requiredFormat);
  next();
});

app.use("/api/providers", router);

app.listen(config.get("api.port"), () => console.log("API initialized"));

app.use((e, req, res, next) => {
  let status = 500;
  if (e instanceof NotFound) {
    status = 404;
  }
  if (e instanceof InvalidField || e instanceof DataNotProvided) {
    status = 400;
  }

  if (e instanceof ValueNotSupported) {
    status = 406;
  }
  res.status(status);
  res.send(JSON.stringify({ message: e.message, id: e.errorID }));
});
