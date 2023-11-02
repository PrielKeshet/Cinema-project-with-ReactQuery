const express = require("express");
const router = express.Router();
const MovieBll = require("../BLL/MoviesBLL");

router.get("/", async (req, resp) => {
  const movies = await MovieBll.GetAll();

  resp.json(movies);
});

router.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const movie = await MovieBll.GetById(id);
  resp.status(200).json(movie);
});

router.post("/", async (req, resp) => {
  const obj = req.body;
  const result = await MovieBll.AddItem(obj);
  resp.status(201).json(result);
});

router.put("/:id", async (req, resp) => {
  const id = req.params.id;
  const obj = req.body;
  const result = await MovieBll.Update(id, obj);
  resp.status(200).json(result);
});

router.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  const result = await MovieBll.Delete(id);
  resp.status(200).json(result);
});

module.exports = router;
