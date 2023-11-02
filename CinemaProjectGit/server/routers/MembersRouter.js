const express = require("express");
const router = express.Router();
const MemberBLL = require("../BLL/MemberBLL");

router.get("/", async (req, resp) => {
  const members = await MemberBLL.GetAll();

  resp.json(members);
});

router.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const member = await MemberBLL.GetById(id);
  resp.status(200).json(member);
});

router.post("/", async (req, resp) => {
  const obj = req.body;
  const result = await MemberBLL.AddItem(obj);
  resp.status(201).json(result);
});

router.put("/:id", async (req, resp) => {
  const id = req.params.id;
  const obj = req.body;
  const result = await MemberBLL.Update(id, obj);
  resp.status(200).json(result);
});

router.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  const result = await MemberBLL.Delete(id);
  resp.status(200).json(result);
});

module.exports = router;
