function getMeetingByID() {
  return `SELECT * FROM meetings
                JOIN assign_participants ON meetings.meeting_id = assign_participants.meeting_id
                        WHERE assign_participants.user_id LIKE ?;`;
}

function createAMeeting() {
  return `INSERT INTO meetings
            (owner, title, agenda, date_of_meeting)
                VALUES
                    (?, ?, ?, ?);`;
}

function findMeetingID() {
  return `SELECT meeting_id FROM meetings
            WHERE meetings.owner = ? AND meetings.title = ?;`;
}

function addParticipants() {
  return `INSERT INTO assign_participants
                (meeting_id, user_id)
                        VALUES
                              (?, ?);`;
}

function deleteAMeeting() {
  return `DELETE meetings, assign_participants FROM meetings
                JOIN assign_participants ON meetings.meeting_id = assign_participants.meeting_id
                        WHERE meetings.meeting_id LIKE ? AND meetings.owner = ?;`;
}

function updateMeetingByID() {
  return `UPDATE meetings 
                          SET ? = ?
                                   WHERE meetings.meeting_id LIKE ? AND meetings.owner = ?;`;
}

module.exports = {
  getMeetingByID,
  createAMeeting,
  findMeetingID,
  addParticipants,
  deleteAMeeting,
  updateMeetingByID,
};
