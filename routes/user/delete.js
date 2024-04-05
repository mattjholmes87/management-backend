const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmail, getUserIndexById } = require("../utils");
const { kw } = require("../../kw");

//Delete a user
router.delete("/", (req, res) => {
  const { id } = req.query;

  if (!id || Number.isNaN(Number(id)) || id <= 0) {
    res.send({ status: 0, reason: "Missing or invalid id" });
    return;
  }

  const indexOf = getUserIndexById(req.users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check ID" });
    return;
  }

  req.users.splice(indexOf, 1);
  res.send({ status: 1, reason: "User deleted" });
});

module.exports = router;
