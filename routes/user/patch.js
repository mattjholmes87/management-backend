const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { kw } = require("../../kw");
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateAUser } = require("../../mysql/userQueries");
const { camelCaseToSnakeCase } = require("../utils");

//Update a user - NOT WORKING
router.patch("/", checkToken, async (req, res) => {
  const { email, password, firstname, surname, staffcode, school, userLevel } =
    req.body;

  if (
    !(
      email ||
      password ||
      firstname ||
      surname ||
      staffcode ||
      school ||
      userLevel
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    const keyArr = [
      "email",
      "firstname",
      "surname",
      "staffcode",
      "school",
      "userLevel",
    ];
    console.log(key);
    if (key === "password") {
      try {
        await asyncMySQL(updateAUser(key), [
          sha256(password + kw),
          req.headers.token,
        ]);
      } catch (e) {
        res.send({
          status: 0,
          reason: `Unable to updated password due to "${e.sqlMessage}"`,
        });
      }
    } else if (keyArr.includes(key)) {
      try {
        let snakeKey = camelCaseToSnakeCase(key);
        await asyncMySQL(updateAUser(snakeKey), [value, req.headers.token]);
      } catch (e) {
        res.send({
          status: 0,
          reason: `Unable to update ${key} due to "${e.sqlMessage}"`,
        });
      }
    } else {
      res.send({ status: 0, reason: "Invalid Key" });
      return;
    }
  }

  res.send({ status: 1, reason: "User updated" });
});

module.exports = router;
