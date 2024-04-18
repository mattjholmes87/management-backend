const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  addParticipants,
  updateMeetingById,
} = require("../../mysql/meetingQueries");
const { camelCaseToSnakeCase } = require("../utils");

//Update a User meetings
router.patch("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;

  const { meetingId, title, agenda, dateOfMeeting, dateOfNext, participants } =
    req.body;

  if (!meetingId) {
    res.send({ status: 0, reason: "Missing Meeting ID" });
    return;
  }
  if (
    !(title || agenda || dateOfMeeting || dateOfNext || participants.length > 0)
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    const keyArr = [
      "meetingId",
      "owner",
      "title",
      "agenda",
      "dateOfMeeting",
      "dateOfNext",
    ];
    console.log(key, keyArr.includes(key));
    if (key === "participants") {
      for (let i = 0; i < participants.length; i++) {
        let participantId = participants[i];
        try {
          await asyncMySQL(addParticipants(), [meetingId, participantId]);
        } catch (e) {
          res.send({
            status: 0,
            reason: `Unable to add meeting due to "${e.sqlMessage}"`,
          });
          return;
        }
      }
    } else if (keyArr.includes(key)) {
      let snakeKey = camelCaseToSnakeCase(key);
      try {
        await asyncMySQL(updateMeetingById(snakeKey), [value, meetingId, id]);
      } catch (e) {
        res.send({
          status: 0,
          reason: `Unable to update meeting due to "${e.sqlMessage}"`,
        });
      }
    } else {
      res.send({ status: 0, reason: "Invalid Key" });
      return;
    }
  }

  res.send({ status: 1, reason: "Meeting updated" });
});

module.exports = router;
