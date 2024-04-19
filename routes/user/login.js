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
  // if (Object.keys(req.body).length === 0) {
  //   res.send({ status: 0, reason: "missing data in body" });
  //   return;
  // }

  let { email, password } = req.body;

  if (!email || !password || Object.keys(req.body).length != 2) {
    res.send({
      status: 0,
      reason: "Missing email or password or too much data",
    });
    return;
  }

  password = sha256(password + kw);

  try {
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
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to login due to "${e.sqlMessage}"`,
    });
  }

  res.send({ status: 0, reason: "Wrong email and/or password" });
});

//Logout
router.delete("/", checkToken, async (req, res) => {
  if (!req.headers.token) {
    res.send({ status: "0", reason: "No token" });
    return;
  }
  try {
    await asyncMySQL(deleteAToken(), [req.headers.token]);
    res.send({ status: 1, reason: "Logged out succesfully" });
    return;
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to logout due to "${e.sqlMessage}"`,
    });
    return;
  }
});

//Logout all accounts of user
router.delete("/logoutAll", checkToken, async (req, res) => {
  if (!req.headers.token) {
    res.send({ status: "0", reason: "No token" });
    return;
  }
  try {
    const id = await asyncMySQL(getUserIdFromToken(), [req.headers.token]);
    await asyncMySQL(deleteAllTokens(), [id[0].userId]);
    res.send({ status: 1, reason: "Logged out succesfully" });
    return;
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to logout all accounts due to "${e.sqlMessage}"`,
    });
    return;
  }
});

module.exports = router;
