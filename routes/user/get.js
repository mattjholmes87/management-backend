const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");

//Get single user
router.get("/id", checkToken, (req, res) => {
  //authedUser coming from Middleware

  res.send({ status: 1, user: req.authedUser });
});

//Get all users - MUST BE DELETED
router.get("/", (req, res) => {
  res.send(req.users);
});

module.exports = router;
