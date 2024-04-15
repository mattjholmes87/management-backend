function getMeetingByID(id) {
  return `SELECT user_id FROM meetings
                JOIN assign_participants ON meetings.meeting_id = assign_participants.meeting_id
                        WHERE assign_participants.user_id LIKE "${id}";`;
}

function createAMeeting(id, title, agenda, date_of_meeting) {
  return `INSERT INTO meetings
            (owner, title, agenda, date_of_meeting)
                VALUES
                    ("${id}", "${title}", "${agenda}", "${date_of_meeting}");`;
}

function findMeetingID(id, title) {
  return `SELECT meeting_id FROM meetings
            WHERE meetings.owner = "${id}" AND meetings.title = "${title}";`;
}

function addParticipants(id, meeting_id, staffcode) {
  return `INSERT INTO assign_participants
                (meeting_id, user_id, staffcode)
                        VALUES
                              ("${meeting_id}", "${id}", "${staffcode}");`;
}

function deleteAMeeting() {
  return `;`;
}

function updateAMeeting() {
  return `;`;
}

module.exports = {
  getMeetingByID,
  createAMeeting,
  findMeetingID,
  addParticipants,
  deleteAMeeting,
  updateAMeeting,
};
