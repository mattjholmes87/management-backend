const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  getAllUsers,
  getUserDetailsFromToken,
  getUserGroups,
} = require("../../mysql/userQueries");

//Get single user
router.get("/id", checkToken, async (req, res) => {
  const results = await asyncMySQL(getUserDetailsFromToken(req.headers.token));
  res.send(results[0]);
});

//Get all users - MUST BE DELETED
router.get("/", async (req, res) => {
  const results = await asyncMySQL(getAllUsers());
  res.send(results);
});

//Get single users Groups
router.get("/groups", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;
  const results = await asyncMySQL(getUserGroups(id));
  res.send(results);
});

module.exports = router;
