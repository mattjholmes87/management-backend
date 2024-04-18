const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getRid } = require("../utils");
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { kw } = require("../../kw");
const { getUserIdFromToken } = require("../../mysql/userQueries");
const {
  findUserByEmailAndPassword,
  addTokenOnLogin,
  deleteAToken,
  deleteAllTokens,
} = require("../../mysql/loginQueries");

//Login
router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + kw);

  const results = await asyncMySQL(findUserByEmailAndPassword(), [
    email,
    password,
  ]);

  if (results.length === 1) {
    token = getRid();
    res.send({ status: 1, reason: "Match Found!", token: token });

    await asyncMySQL(addTokenOnLogin(), [results[0].userId, token]);
    return;
  }
  res.send({ status: 0, reason: "Wrong email and/or password" });
});

//Logout
router.delete("/", checkToken, async (req, res) => {
  if (!req.headers.token) {
    res.send({ status: "0", reason: "No token" });
    return;
  }
  await asyncMySQL(deleteAToken(), [req.headers.token]);

  res.send({ status: 1, reason: "Logged out succesfully" });
});

//Logout all accounts of user
router.delete("/logoutAll", checkToken, async (req, res) => {
  if (!req.headers.token) {
    res.send({ status: "0", reason: "No token" });
    return;
  }
  const id = await asyncMySQL(getUserIdFromToken(), [req.headers.token]);
  await asyncMySQL(deleteAllTokens(), [id[0].userId]);
  res.send({ status: 1, reason: "Logged out succesfully" });
});

module.exports = router;
