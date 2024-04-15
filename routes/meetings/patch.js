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

//Update a User meetings - where to put try catch for duplicate meetings?
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
        let participant_array = await asyncMySQL(
          getUserStaffCodeFromID(participants[i])
        );
        let staffcode = participant_array[0].staffcode;
        let p_id = participants[i];
        try {
          await asyncMySQL(addParticipants(p_id, meeting_id, staffcode));
        } catch (e) {
          console.log(
            `Unable to update meeting participants due to "${e.sqlMessage}"`
          );
        }
      }
    } else {
      await asyncMySQL(updateMeetingByID(meeting_id, id, key, value));
    }
  }

  res.send({ status: 1, reason: "Meeting updated" });
});

module.exports = router;
