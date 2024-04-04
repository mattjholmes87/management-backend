const express = require("express");
const router = express.Router();
const userData = require("../users.json");
const sha256 = require("sha256");

//Add a user
router.post("/", (req, res) => {
  const { users } = req;

  if (!req.body.email || !req.body.password || !req.body.staffcode) {
    res.send({ status: 0, reason: "Missing data to register" });
  }

  req.body.password = sha256(req.body.password + "intray");

  const user = users.find((user) => {
    return user.email === req.body.email;
  });

  if (user) {
    res.send({ status: 0, reason: "Email already in use" });
    return;
  }

  users.push(req.body);
  console.log(users);
  res.send({ status: 1, reason: "New user added" });
});

module.exports = router;
