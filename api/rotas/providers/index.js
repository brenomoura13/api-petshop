const router = require("express").Router();
const providerTable = require("./ProviderTables");
const Provider = require("./Provider");

router.get("/", async (_, res) => {
  const resul = await providerTable.getList();
  res.send(JSON.stringify(resul));
});

router.post("/", async (req, res) => {
  const receivedData = req.body;
  const provider = new Provider(receivedData);
  await provider.create();
  res.send(JSON.stringify(provider));
});

module.exports = router;
