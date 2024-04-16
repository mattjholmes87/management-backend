function addAUser(email, password, firstname, surname, staffcode, school_id) {
  return `INSERT INTO users
                        (users.email, users.password, users.firstname, users.surname, users.staffcode, users.school_id)
                                VALUES 
                                        ("${email}", "${password}", "${firstname}", "${surname}", "${staffcode}", ${school_id});`;
}

function addAToken(id, token) {
  return `INSERT INTO tokens
                (user_id, token)
                    VALUES
                        (${id}, "${token}");`;
}

function deleteAToken(token) {
  return `DELETE tokens FROM tokens
            WHERE tokens.token LIKE "${token}";`;
}

function deleteAllTokens(id) {
  return `DELETE tokens FROM tokens
            WHERE tokens.user_id LIKE ${id};`;
}

function deleteAUser(user_id) {
  return `DELETE users, assign_participants, groups, meetings, tokens, todos FROM users
              LEFT JOIN assign_participants ON users.user_id = assign_participants.user_id
                    LEFT JOIN groups ON users.user_id = groups.user_id
                        LEFT JOIN meetings ON users.user_id = meetings.owner
                              LEFT JOIN tokens ON users.user_id = tokens.user_id
                                      LEFT JOIN todos ON users.user_id = todos.created_by
                                            WHERE users.user_id = ${user_id};`;
}

function updateAUser(key, value, token) {
  return `UPDATE users
            JOIN tokens ON users.user_id = tokens.user_id
                SET ${key} = "${value}"
                    WHERE tokens.token LIKE "${token}";`;
}

function getUserIDFromToken(token) {
  return `SELECT users.user_id, users.school_id FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE "${token}";`;
}

function getUserStaffCodeFromID(id) {
  return `SELECT staffcode FROM users
                  WHERE users.user_id LIKE ${id};`;
}

function getUserSchoolCodeFromID(id) {
  return `SELECT school_id FROM users
                  WHERE users.user_id LIKE ${id};`;
}

function getUserLevelFromID(id) {
  return `SELECT user_level FROM users
              WHERE users.user_id LIKE ${id};`;
}

function getUserIDFromStaffCode(staffcode) {
  return `SELECT user_id FROM users
                  WHERE users.staffcode LIKE "${staffcode}";`;
}

function getUserDetailsFromToken(token) {
  return `SELECT * FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE "${token}";`;
}

function getAllUsers() {
  return `SELECT * FROM users;`;
}

function getUserManager(id) {
  return `SELECT users.line_manager FROM users
                        WHERE users.user_id LIKE "${id}";`;
}

function getUserGroups(id) {
  return `SELECT * FROM groups
                        WHERE groups.user_id LIKE ${id};`;
}

function getGroupSchool(group_id) {
  return `SELECT assign_groups.school_id FROM assign_groups
              WHERE assign_groups.group_id = ${group_id};`;
}

function addUserToGroups(user_id, group_id, school_id) {
  return `INSERT INTO groups
              (user_id, group_id, school_id)
                    VALUES 
                        (${user_id}, ${group_id}, ${school_id});`;
}

function addUserGroup(group_name, school_id) {
  return `INSERT INTO assign_groups
              (group_name, school_id)
                    VALUES 
                        ("${group_name}", ${school_id});`;
}

function updateUserGroupNames(user_id) {
  return `UPDATE groups
            JOIN assign_groups ON groups.group_id = assign_groups.group_id
                 SET groups.group_name = assign_groups.group_name
                        WHERE groups.group_id = assign_groups.group_id AND groups.user_id = ${user_id};`;
}

function updateUserSchoolNames(user_id) {
  return `UPDATE users
            JOIN schools ON users.school_id = schools.school_id
                 SET users.school = schools.school
                        WHERE users.school_id = schools.school_id AND users.user_id = ${user_id};`;
}

function deleteUserFromGroup(user_id, group_id) {
  return `DELETE groups FROM groups
              WHERE group_id LIKE ${group_id} AND user_id LIKE ${user_id};`;
}

function deleteUserGroup(group_id) {
  return `DELETE groups, assign_groups FROM groups
                JOIN assign_groups ON groups.group_id = assign_groups.group_id
                      WHERE groups.group_id LIKE ${group_id};`;
}

module.exports = {
  addAUser,
  addAToken,
  addUserToGroups,
  addUserGroup,
  updateUserGroupNames,
  updateUserSchoolNames,
  deleteAToken,
  deleteAUser,
  updateAUser,
  getUserIDFromToken,
  getUserDetailsFromToken,
  getUserStaffCodeFromID,
  getUserLevelFromID,
  getUserIDFromStaffCode,
  getUserSchoolCodeFromID,
  getGroupSchool,
  getAllUsers,
  deleteAllTokens,
  deleteUserFromGroup,
  deleteUserGroup,
  getUserManager,
  getUserGroups,
};
