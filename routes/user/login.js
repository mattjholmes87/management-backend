const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getRid } = require("../utils");
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { kw } = require("../../kw");
const { deleteAToken } = require("../../mysql/queries");

//Login
router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + kw);

  const results = await asyncMySQL(`SELECT * FROM users
                                     WHERE email LIKE "${email}" AND password LIKE "${password}";`);

  if (results.length > 0) {
    token = getRid();
    res.send({ status: 1, reason: "Match Found!", token: token });

    await asyncMySQL(`INSERT INTO tokens
                        (user_id, token)
                            VALUES
                                ("${results[0].user_id}", "${token}");`);

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
  await asyncMySQL(deleteAToken(req.headers.token));

  res.send({ status: 1, reason: "Logged out succesfully" });
});

//Logout all accounts of user
router.delete("/logoutAll", checkToken, (req, res) => {
  req.authedUser.token = [];

  res.send({ status: 1, reason: "Logged out succesfully" });
});

module.exports = router;
