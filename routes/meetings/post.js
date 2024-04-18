const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  createAMeeting,
  addParticipants,
  findMeetingId,
} = require("../../mysql/meetingQueries");

// Adds meetings with participants
router.post("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;

  const { title, agenda, dateOfMeeting, participants } = req.body;

  try {
    await asyncMySQL(createAMeeting(), [id, title, agenda, dateOfMeeting]);
    const result = await asyncMySQL(findMeetingId(), [id, title]);
    const meetingId = result[0].meetingId;
    console.log(meetingId);
    if (!participants in req.body) {
      return;
    }

    for (let i = 0; i < participants.length; i++) {
      let participantId = participants[i];
      asyncMySQL(addParticipants(), [meetingId, participantId]);
    }
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to add meeting due to "${e.sqlMessage}"`,
    });
  }

  res.send({ status: 1, reason: "meeting added" });
});

module.exports = router;
