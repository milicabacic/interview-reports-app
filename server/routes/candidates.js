const express = require("express");

const router = express.Router();

const CandidatesModel = require("../models/Candidates");

router.get("/", async (req, res) => {
  const entities = await CandidatesModel.find();
  res.json(entities);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const entity = await CandidatesModel.findById(id);
  res.send(entity);
});

router.post("/", async (req, res) => {
  const data = req.body;

  const { email } = data;

  var reg = /[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

  if (!reg.test(email.trim()))
    return res.status(400).json({ message: "Email pattern is not valid." });

  const entity = new CandidatesModel(data);
  res.json(await entity.save());
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const entity = await CandidatesModel.findById(id);
  if (entity) res.json(await entity.update(data));
  else throw new Error("Cannot update nonexisting entity, id mismatch");
});

router.delete("/", async (req, res) => {
  res.json(await CandidatesModel.deleteMany({}));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const entity = await CandidatesModel.findById(id);
  if (entity) res.json(await entity.remove());
  else throw new Error("Cannot delete nonexisting entity, id mismatch");
});

module.exports = router;
