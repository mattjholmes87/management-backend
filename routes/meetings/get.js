const express = require("express");
const router = express.Router();
const { checkToken, checkUserLevel } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { getMeetingById } = require("../../mysql/meetingQueries");

//Get User meetings
router.get("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;
  try {
    const meetings = await asyncMySQL(getMeetingById(), [id]);
    res.send(meetings);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to get meeting due to "${e.sqlMessage}"`,
    });
  }
});

//get meeting by date - TO complete

module.exports = router;
