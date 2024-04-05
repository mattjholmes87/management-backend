const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const {
  getUserByEmail,
  getUserIndexById,
  getUserByEmailAndPassword,
  getRV,
} = require("../utils");
const { kw } = require("../../kw");

//Add a user
router.post("/new", (req, res) => {
  let { users, lastUserId } = req;

  //Checks
  if (!req.body.email || !req.body.password || !req.body.staffcode) {
    res.send({ status: 0, reason: "Missing data to register" });
  }

  const user = getUserByEmail(users, req.body.email);

  if (user) {
    res.send({ status: 0, reason: "Email already in use" });
    return;
  }

  //manipulate input
  req.body.password = sha256(req.body.password + kw);
  lastUserId.value = lastUserId.value += Math.floor(Math.random() * 9 + 1);
  req.body.id = lastUserId.value;

  //push to state
  users.push(req.body);
  res.send({ status: 1, reason: "New user added" });
});

//Login
router.post("/login", (req, res) => {
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

  token = getRV();
  user.token = token;
  console.log(user);
  res.send({ status: 1, reason: "Match Found!", token: token });
});

module.exports = router;
