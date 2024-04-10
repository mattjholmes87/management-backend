const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserIndexById, getUserIndexByToken } = require("../utils");
const { kw } = require("../../kw");
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateAUser } = require("../../mysql/queries");

//Update a user
router.patch("/", (req, res) => {
  if (
    !(
      req.body.email ||
      req.body.password ||
      req.body.firstname ||
      req.body.surname ||
      req.body.staffcode ||
      req.body.school ||
      req.body.user_level
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  //Rehash password
  if (req.body.password) {
    asyncMySQL(
      updateAUser("password", sha256(req.body.password + kw), req.headers.token)
    );
  }

  if (req.body.email) {
    asyncMySQL(updateAUser("email", req.body.email, req.headers.token));
  }
  if (req.body.firstname) {
    asyncMySQL(updateAUser("firstname", req.body.firstname, req.headers.token));
  }
  if (req.body.surname) {
    asyncMySQL(updateAUser("surname", req.body.surname, req.headers.token));
  }
  if (req.body.staffcode) {
    asyncMySQL(updateAUser("staffcode", req.body.staffcode, req.headers.token));
  }
  if (req.body.school) {
    asyncMySQL(updateAUser("school", req.body.school, req.headers.token));
  }
  if (req.body.user_level) {
    asyncMySQL(
      updateAUser("user_level", req.body.user_level, req.headers.token)
    );
  }
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
