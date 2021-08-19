const express = require("express");
const app = express();
const config = require("config");
const router = require("./rotas/providers");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/providers", router);

app.listen(config.get("api.port"), () => console.log("API initialized"));
