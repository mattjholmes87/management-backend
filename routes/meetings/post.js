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
    await asyncMySQL(createAMeeting(), [id, title, agenda, date_of_meeting]);
    const meeting_id = await asyncMySQL(findMeetingID(), [id, title]);
    const m_id = meeting_id[0].meeting_id;

    if (!participants in req.body) {
      return;
    }

    for (let i = 0; i < participants.length; i++) {
      let p_id = participants[i];
      console.log(m_id, p_id);
      asyncMySQL(addParticipants(), [m_id, p_id]);
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
