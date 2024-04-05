const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmail, getUserIndexById } = require("../utils");
const { kw } = require("../../kw");
const { checkToken } = require("../../middleware/test");

//Get single user
router.get("/id", checkToken, (req, res) => {
  //   const { id } = req.query;

  //   if (!id || Number.isNaN(Number(id)) || id <= 0) {
  //     res.send({ status: 0, reason: "Missing or invalid id" });
  //     return; //This return
  //   }

  //   const indexOf = getUserIndexById(req.users, id);

  //   if (indexOf === -1) {
  //     res.send({ status: 0, reason: "User not found, check ID" });
  //     return;
  //   }

  res.send({ status: 1, user: req.authedUser });
});

//Get all users - MUST BE DELETED
router.get("/", (req, res) => {
  res.send(req.users);
});

module.exports = router;
