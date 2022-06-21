const express = require("express");

const router = express.Router();

const CompaniesModel = require("../models/Companies");

router.get("/", async (req, res) => {
  const entities = await CompaniesModel.find();
  res.json(entities);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const entity = await CompaniesModel.findById(id);
  res.send(entity);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const entity = new CompaniesModel(data);

  res.json(await entity.save());
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const entity = await CompaniesModel.findById(id);
  if (entity) res.json(await entity.update(data));
  else throw new Error("Cannot update nonexisting entity, id mismatch");
});

router.delete("/", async (req,res)=> {
  res.json(await CompaniesModel.deleteMany({}))
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const entity = await CompaniesModel.findById(id);
  if (entity) res.json(await entity.remove());
  else throw new Error("Cannot delete nonexisting entity, id mismatch");
});

module.exports = router;
