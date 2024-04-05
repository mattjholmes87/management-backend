const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmail, getUserIndexById } = require("../utils");
const { kw } = require("../../kw");

//Update a user
router.patch("/", (req, res) => {
  const { id } = req.query;

  if (
    !(
      req.body.email ||
      req.body.password ||
      req.body.firstname ||
      req.body.surname ||
      req.body.staffcode ||
      req.body.groups ||
      req.body.groups ||
      req.body.subject ||
      req.body.level
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  if (!id || Number.isNaN(Number(id)) || id <= 0) {
    res.send({ status: 0, reason: "Missing or invalid id" });
    return;
  }

  const indexOf = getUserIndexById(req.users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check ID" });
    return;
  }

  //Rehash password

  if (req.body.password) {
    req.body.password = sha256(req.body.password + kw);
  }

  //Amend original at indexOf by body of request
  req.users[indexOf] = { ...req.users[indexOf], ...req.body };
  res.send({ status: 1, reason: "User updated" });
});

//Add new data to user - would be away to store and retrieve settings
router.patch("/append", (req, res) => {
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

  req.users[indexOf].newData = req.body;
  res.send({ status: 1, reason: "New data added" });
});

module.exports = router;
