const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { kw } = require("../../kw");
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateAUser } = require("../../mysql/userQueries");

//Update a user
router.patch("/", checkToken, async (req, res) => {
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
    await asyncMySQL(
      updateAUser("password", sha256(req.body.password + kw), req.headers.token)
    );
  }

  if (req.body.email) {
    await asyncMySQL(updateAUser("email", req.body.email, req.headers.token));
  }
  if (req.body.firstname) {
    await asyncMySQL(
      updateAUser("firstname", req.body.firstname, req.headers.token)
    );
  }
  if (req.body.surname) {
    await asyncMySQL(
      updateAUser("surname", req.body.surname, req.headers.token)
    );
  }
  if (req.body.staffcode) {
    await asyncMySQL(
      updateAUser("staffcode", req.body.staffcode, req.headers.token)
    );
  }
  if (req.body.school) {
    await asyncMySQL(updateAUser("school", req.body.school, req.headers.token));
  }
  if (req.body.user_level) {
    await asyncMySQL(
      updateAUser("user_level", req.body.user_level, req.headers.token)
    );
  }
  res.send({ status: 1, reason: "User updated" });
});

module.exports = router;
