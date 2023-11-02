const express = require("express");
const router = express.Router();
const Subsbll = require("../BLL/SubsBLL");

router.get("/", async (req, resp) => {
  const subs = await Subsbll.GetAll();
  resp.json(subs);
});

router.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const sub = await Subsbll.GetById(id);
  resp.status(200).json(sub);
});

router.post("/", async (req, resp) => {
  const obj = req.body;
  const result = await Subsbll.AddItem(obj);
  resp.status(201).json(result);
});

router.put("/:id", async (req, resp) => {
  const id = req.params.id;
  const obj = req.body;
  const result = await Subsbll.Update(id, obj);
  resp.status(200).json(result);
});

router.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  const result = await Subsbll.Delete(id);
  resp.status(200).json(result);
});

module.exports = router;
