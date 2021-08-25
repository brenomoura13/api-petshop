const express = require("express");
const app = express();
const config = require("config");
const router = require("./routes/providers");
const NotFound = require("./errors/NotFound");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/providers", router);

app.listen(config.get("api.port"), () => console.log("API initialized"));

app.use((e, req, res, next) => {
  if (e instanceof NotFound) {
    res.status(404);
  } else {
    res.status(400);
  }
  res.send(JSON.stringify({ message: e.message, id: e.errorID }));
});
