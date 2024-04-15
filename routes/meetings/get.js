const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { getMeetingByID } = require("../../mysql/meetingQueries");

//Get User meetings
router.get("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const meetings = await asyncMySQL(getMeetingByID(id));

  res.send(meetings);
});

//get meeting by date

module.exports = router;
