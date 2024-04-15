const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { deleteAMeeting } = require("../../mysql/meetingQueries");

//Delete a User meetings
router.delete("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  await asyncMySQL(deleteAMeeting(req.headers.meeting_id, id));

  res.send({ status: 1, reason: "Meeting deleted" });
});

module.exports = router;
