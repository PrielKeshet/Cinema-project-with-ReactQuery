const express = require("express");
const router = express.Router();
const userBLL = require("../BLL/UserBLL");

router.get("/", async (req, resp) => {
  const users = await userBLL.GetAll();

  resp.json(users);
});

module.exports = router;
