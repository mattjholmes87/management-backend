const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

//Add a user
router.post("/", (req, res) => {
  let { users, lastUserId } = req;

  //Checks
  if (!req.body.email || !req.body.password || !req.body.staffcode) {
    res.send({ status: 0, reason: "Missing data to register" });
  }

  const user = users.find((user) => {
    return user.email === req.body.email;
  });

  if (user) {
    res.send({ status: 0, reason: "Email already in use" });
    return;
  }

  //manipulate input
  req.body.password = sha256(req.body.password + "intray");
  lastUserId.value = lastUserId.value += Math.floor(Math.random() * 9 + 1);
  req.body.id = lastUserId.value;

  //push to state
  users.push(req.body);
  res.send({ status: 1, reason: "New user added" });
});

//Delete a user
router.delete("/", (req, res) => {
  const { id } = req.query;

  if (!id || Number.isNaN(Number(id)) || id <= 0) {
    res.send({ status: 0, reason: "Missing or invalid id" });
    return; //This return
  }

  const indexOf = req.users.findIndex((user) => {
    return user.id === Number(id);
  });

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check ID" });
    return;
  }

  req.users.splice(indexOf, 1);
  res.send({ status: 1, reason: "User deleted" });
});

//Get all users - MUST BE DELETED
router.get("/", (req, res) => {
  res.send(req.users);
});

module.exports = router;
