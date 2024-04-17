const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  addParticipants,
  updateMeetingByID,
} = require("../../mysql/meetingQueries");
const { camelCaseToSnakeCase } = require("../utils");

//Update a User meetings
router.patch("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const { meetingID, title, agenda, dateOfMeeting, dateOfNext, participants } =
    req.body;

  if (!meetingID) {
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
      "meetingID",
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
      await asyncMySQL(updateMeetingByID(snakeKey), [value, meetingID, id]);
    } else {
      res.send({ status: 0, reason: "Invalid Key" });
      return;
    }
  }

  res.send({ status: 1, reason: "Meeting updated" });
});

module.exports = router;
