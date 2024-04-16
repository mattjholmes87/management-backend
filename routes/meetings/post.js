const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  createAMeeting,
  addParticipants,
  findMeetingID,
} = require("../../mysql/meetingQueries");
const { getUserStaffCodeFromID } = require("../../mysql/userQueries");

// Adds meetings with participants
router.post("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const { title, agenda, date_of_meeting, participants } = req.body;

  try {
    await asyncMySQL(createAMeeting(id, title, agenda, date_of_meeting));
    const meeting_id = await asyncMySQL(findMeetingID(id, title));
    const m_id = meeting_id[0].meeting_id;

    if (!participants in req.body) {
      return;
    }

    for (let i = 0; i < participants.length; i++) {
      let participant_array = await asyncMySQL(
        getUserStaffCodeFromID(participants[i])
      );
      let staffcode = participant_array[0].staffcode;
      let p_id = participants[i];
      asyncMySQL(addParticipants(p_id, m_id, staffcode));
    }

    res.send({ status: 1, reason: "meeting added" });
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to add meeting due to "${e.sqlMessage}"`,
    });
  }
});

module.exports = router;
