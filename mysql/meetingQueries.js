function getMeetingById() {
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

function findMeetingId() {
  return `SELECT meeting_id AS meetingId FROM meetings
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

function updateMeetingById(key) {
  return `UPDATE meetings 
                          SET ${key} = ?
                                   WHERE meetings.meeting_id LIKE ? AND meetings.owner = ?;`;
}

module.exports = {
  getMeetingById,
  createAMeeting,
  findMeetingId,
  addParticipants,
  deleteAMeeting,
  updateMeetingById,
};
