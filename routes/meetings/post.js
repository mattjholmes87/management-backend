const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  createAMeeting,
  addParticipants,
  findMeetingID,
} = require("../../mysql/meetingQueries");

// Adds meetings with participants
router.post("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const { title, agenda, dateOfMeeting, participants } = req.body;

  try {
    await asyncMySQL(createAMeeting(), [id, title, agenda, dateOfMeeting]);
    const result = await asyncMySQL(findMeetingID(), [id, title]);
    const meetingID = result[0].meetingID;
    console.log(meetingID);
    if (!participants in req.body) {
      return;
    }

    for (let i = 0; i < participants.length; i++) {
      let participantID = participants[i];
      asyncMySQL(addParticipants(), [meetingID, participantID]);
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
