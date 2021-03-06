const router = require("express").Router();
const providerTable = require("./ProviderTables");
const Provider = require("./Provider");
const VendorSerializer = require("../../serializer").VendorSerializer;

/* Conhecendo o metodo GET */
router.get("/", async (_, res) => {
  const resul = await providerTable.getList();
  res.status(200);
  const serialize = new VendorSerializer(res.getHeader("Content-Type"));
  res.send(serialize.serializer(resul));
});

/* Persistindo dados */
router.post("/", async (req, res, next) => {
  try {
    const receivedData = req.body;
    const provider = new Provider(receivedData);
    await provider.create();
    res.status(201);
    const serialize = new VendorSerializer(res.getHeader("Content-Type"));
    res.send(serialize.serializer(provider));
  } catch (e) {
    next(e);
  }
});

/* Persistindo dados - Procurando por ID */
router.get("/:idProvider", async (req, res, next) => {
  try {
    const id = req.params.idProvider;
    const provider = new Provider({ id: id });
    await provider.load();
    res.status(200);
    const serialize = new VendorSerializer(res.getHeader("Content-Type"), [
      "email",
      "versao",
    ]);
    res.send(serialize.serializer(provider));
  } catch (e) {
    next(e);
  }
});

/* Alterando estados através de um ID fornecido */
router.put("/:idProvider", async (req, res, next) => {
  try {
    const id = req.params.idProvider;
    const receivedData = req.body;
    const data = Object.assign({}, receivedData, { id: id });
    const provider = new Provider(data);
    await provider.update();
    res.status(204);
    res.end();
  } catch (e) {
    next(e);
  }
});

/* Deletando uma empresa através de um ID fornecido */
router.delete("/:idProvider", async (req, res, next) => {
  try {
    const id = req.params.idProvider;
    const provider = new Provider({ id: id });
    await provider.load();
    await provider.remove();
    res.status(204);
    res.end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
