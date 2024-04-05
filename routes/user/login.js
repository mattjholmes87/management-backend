const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmailAndPassword, getRid } = require("../utils");
const { checkToken } = require("../../middleware/test");

//Login
router.post("/", (req, res) => {
  //Checks
  if (!req.body.email || !req.body.password) {
    res.send({ status: 0, reason: "Missing login data" });
  }

  //Find User
  const user = getUserByEmailAndPassword(
    req.users,
    req.body.email,
    req.body.password
  );

  if (!user) {
    res.send({ status: 0, reason: "Incorrect email or password" });
    return;
  }

  token = getRid();
  user.token.push(token);
  res.send({ status: 1, reason: "Match Found!", token: token });
});

//Logout
router.delete("/", checkToken, (req, res) => {
  req.authedUser.token = [];

  res.send({ status: 1, reason: "Logged out succesfully" });
});

module.exports = router;
