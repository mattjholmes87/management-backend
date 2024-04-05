const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const { getUserIndexByToken } = require("../utils");

//Delete a user
router.delete("/", checkToken, (req, res) => {
  const indexOf = getUserIndexByToken(req.users, req.headers.token);

  req.users.splice(indexOf, 1);

  res.send({ status: 1, reason: "User deleted" });
});

module.exports = router;
