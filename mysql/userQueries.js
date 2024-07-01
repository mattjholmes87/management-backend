function addAUser() {
  return `INSERT INTO users
                        (users.email, users.password, users.firstname, users.surname, users.staffcode, users.school_id)
                                VALUES 
                                        (?, ?, ?, ?, ?, ?);`;
}

function addAToken() {
  return `INSERT INTO tokens
                (user_id, token)
                    VALUES
                        (?, ?);`;
}

function deleteAUser() {
  return `DELETE users, assign_participants, groups, meetings, tokens, todos FROM users
              LEFT JOIN assign_participants ON users.user_id = assign_participants.user_id
                    LEFT JOIN groups ON users.user_id = groups.user_id
                        LEFT JOIN meetings ON users.user_id = meetings.owner
                              LEFT JOIN tokens ON users.user_id = tokens.user_id
                                      LEFT JOIN todos ON users.user_id = todos.created_by
                                            WHERE users.user_id = ?;`;
}

//Not working - string in params causes issue
function updateAUser(key) {
  return `UPDATE users
            JOIN tokens ON users.user_id = tokens.user_id
                SET ${key} = ?
                    WHERE tokens.token LIKE ?;`;
}

function getUserIdFromToken() {
  return `SELECT users.user_id AS userId, users.school_id AS schoolId FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE ?;`;
}

function getUserStaffCodeFromId() {
  return `SELECT staffcode FROM users
                  WHERE users.user_id LIKE ?;`;
}

function getUserSchoolCodeFromId() {
  return `SELECT school_id AS schoolId FROM users
                  WHERE users.user_id LIKE ?;`;
}

function getUserLevelFromId() {
  return `SELECT user_level AS userLevel FROM users
              WHERE users.user_id LIKE ?;`;
}

function getUserIdFromStaffCode() {
  return `SELECT user_id FROM users
                  WHERE users.staffcode LIKE ?;`;
}

function getUserDetailsFromToken() {
  return `SELECT * FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE ?;`;
}

function getAllUsers() {
  return `SELECT * FROM users;`;
}

function getAllSchools() {
  return `SELECT school, school_id AS schoolId FROM schools;`;
}

function getUserManager() {
  return `SELECT users.line_manager AS lineManager FROM users
                        WHERE users.user_id LIKE ?;`;
}

function getUserGroups() {
  return `SELECT * FROM groups
                        WHERE groups.user_id LIKE ?;`;
}

function getGroupSchool() {
  return `SELECT assign_groups.school_id AS schoolId FROM assign_groups
              WHERE assign_groups.group_id = ?;`;
}

function addUserToGroups() {
  return `INSERT INTO groups
              (user_id, group_id, school_id)
                    VALUES 
                        (?, ?, ?);`;
}

function addUserGroup() {
  return `INSERT INTO assign_groups
              (group_name, school_id)
                    VALUES 
                        (?, ?);`;
}

function updateUserGroupNames() {
  return `UPDATE groups
            JOIN assign_groups ON groups.group_id = assign_groups.group_id
                 SET groups.group_name = assign_groups.group_name
                        WHERE groups.group_id = assign_groups.group_id AND groups.user_id = ?;`;
}

function updateUserSchoolNames() {
  return `UPDATE users
            JOIN schools ON users.school_id = schools.school_id
                 SET users.school = schools.school
                        WHERE users.school_id = schools.school_id AND users.user_id = ?;`;
}

function deleteUserFromGroup() {
  return `DELETE groups FROM groups
              WHERE group_id LIKE ? AND user_id LIKE ?;`;
}

function deleteUserGroup() {
  return `DELETE groups, assign_groups FROM groups
                JOIN assign_groups ON groups.group_id = assign_groups.group_id
                      WHERE groups.group_id LIKE ?;`;
}

function getLineManagerReportees() {
  return `SELECT users.user_id AS userId, users.user_level AS userLevel, users.firstname, users.surname, users.school, users.school_id AS schoolId, users.staffcode FROM users
                        WHERE users.line_manager LIKE ?;`;
}

module.exports = {
  addAUser,
  addAToken,
  addUserToGroups,
  addUserGroup,
  updateUserGroupNames,
  updateUserSchoolNames,
  deleteAUser,
  updateAUser,
  getUserIdFromToken,
  getUserDetailsFromToken,
  getUserStaffCodeFromId,
  getUserLevelFromId,
  getUserIdFromStaffCode,
  getUserSchoolCodeFromId,
  getGroupSchool,
  getAllUsers,
  getAllSchools,
  getLineManagerReportees,
  deleteUserFromGroup,
  deleteUserGroup,
  getUserManager,
  getUserGroups,
};
