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
  try {
    const results = await asyncMySQL(getUserDetailsFromToken(), [
      req.headers.token,
    ]);
    res.send(results[0]);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to get user due to "${e.sqlMessage}"`,
    });
  }
});

//Get all users - MUST BE DELETED
router.get("/", async (req, res) => {
  try {
    const results = await asyncMySQL(getAllUsers());
    res.send(results);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to get all users due to "${e.sqlMessage}"`,
    });
  }
});

//Get single users Groups
router.get("/groups", checkToken, async (req, res) => {
  try {
    const id = req.authenticatedUserId;
    const results = await asyncMySQL(getUserGroups(), [id]);
    res.send(results);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to user groups due to "${e.sqlMessage}"`,
    });
  }
});

module.exports = router;
