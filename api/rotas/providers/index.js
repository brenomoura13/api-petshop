const router = require("express").Router();
const providerTable = require("./ProviderTables");
const Provider = require("./Provider");

/* Conhecendo o metodo GET */
router.get("/", async (_, res) => {
  const resul = await providerTable.getList();
  res.send(JSON.stringify(resul));
});

/* Persistindo dados */
router.post("/", async (req, res) => {
  try {
    const receivedData = req.body;
    const provider = new Provider(receivedData);
    await provider.create();
    res.send(JSON.stringify(provider));
  } catch (e) {
    res.send(JSON.stringify({ message: e.message }));
  }
});

/* Persistindo dados - Procurando por ID */
router.get("/:idProvider", async (req, res) => {
  try {
    const id = req.params.idProvider;
    const provider = new Provider({ id: id });
    await provider.load();
    res.send(JSON.stringify(provider));
  } catch (e) {
    res.send(JSON.stringify({ message: e.message }));
  }
});

/* Alterando estados através de um ID fornecido */
router.put("/:idProvider", async (req, res) => {
  try {
    const id = req.params.idProvider;
    const receivedData = req.body;
    const data = Object.assign({}, receivedData, { id: id });
    const provider = new Provider(data);
    await provider.update();
    res.end();
  } catch (e) {
    res.send(JSON.stringify({ message: e.message }));
  }
});

/* Deletando uma empresa através de um ID fornecido */
router.delete("/:idProvider", async (req, res) => {
  try {
    const id = req.params.idProvider;
    const provider = new Provider({ id: id });
    await provider.load();
    await provider.remove();
    res.end();
  } catch (e) {
    res.send(JSON.stringify({ message: e.message }));
  }
});

module.exports = router;
