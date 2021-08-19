

const router = require("express").Router();
const providerTable = require("./ProviderTables");

router.use("/", async (_, res) => {
  const resul = await providerTable.getList();
  res.send(JSON.stringify(resul));
});

module.exports = router;
