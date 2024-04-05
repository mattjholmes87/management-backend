const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmail, getUserIndexById } = require("./utils");
const { kw } = require("../kw");

//Add a user
router.post("/", (req, res) => {
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

//Get single user
router.get("/id", (req, res) => {
  const { id } = req.query;

  if (!id || Number.isNaN(Number(id)) || id <= 0) {
    res.send({ status: 0, reason: "Missing or invalid id" });
    return; //This return
  }

  const indexOf = getUserIndexById(req.users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check ID" });
    return;
  }

  res.send({ status: 1, user: req.users[indexOf] });
});

//Get all users - MUST BE DELETED
router.get("/", (req, res) => {
  res.send(req.users);
});

module.exports = router;
