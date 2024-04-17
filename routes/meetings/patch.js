const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { getDateStamp } = require("../utils");
const { getUserStaffCodeFromID } = require("../../mysql/userQueries");
const {
  addParticipants,
  updateMeetingByID,
} = require("../../mysql/meetingQueries");

//Update a User meetings
router.patch("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const {
    meeting_id,
    title,
    agenda,
    date_of_meeting,
    date_of_next,
    participants,
  } = req.body;

  if (!meeting_id) {
    res.send({ status: 0, reason: "Missing Meeting ID" });
    return;
  }
  if (
    !(
      title ||
      agenda ||
      date_of_meeting ||
      date_of_next ||
      participants.length > 0
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key === "participants") {
      for (let i = 0; i < participants.length; i++) {
        let p_id = participants[i];
        try {
          await asyncMySQL(addParticipants(), [meeting_id, p_id]);
        } catch (e) {
          res.send({
            status: 0,
            reason: `Unable to add meeting due to "${e.sqlMessage}"`,
          });
          return;
        }
      }
    } else {
      await asyncMySQL(updateMeetingByID(), [key, value, meeting_id, id]);
    }
  }

  res.send({ status: 1, reason: "Meeting updated" });
});

module.exports = router;
