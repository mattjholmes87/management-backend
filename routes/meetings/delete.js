const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { deleteAMeeting } = require("../../mysql/meetingQueries");

//Delete a User meetings
router.delete("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;

  try {
    await asyncMySQL(deleteAMeeting(), [req.headers.meeting_id, id]);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to delete meeting due to "${e.sqlMessage}"`,
    });
  }

  res.send({ status: 1, reason: "Meeting deleted" });
});

module.exports = router;
