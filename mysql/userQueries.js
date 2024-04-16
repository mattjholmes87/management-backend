function addAUser(
  email,
  password,
  firstname,
  surname,
  staffcode,
  school,
  user_level
) {
  return `INSERT INTO users
                        (email, password, firstname, surname, staffcode, school, user_level)
                                VALUES 
                                        ("${email}", "${password}", "${firstname}", "${surname}", "${staffcode}", "${school}", "${user_level}");`;
}

function addAToken(id, token) {
  return `INSERT INTO tokens
                (user_id, token)
                    VALUES
                        ("${id}", "${token}");`;
}

function deleteAToken(token) {
  return `JOIN tokens ON users.user_id = tokens.user_id
;`;
}

function deleteAllTokens(id) {
  return `DELETE tokens FROM tokens
            WHERE tokens.user_id LIKE "${id}";`;
}

function deleteAUser(token) {
  return `DELETE users, tokens FROM users
		JOIN tokens ON users.user_id = tokens.user_id WHERE token LIKE "${token}";`;
}

function updateAUser(key, value, token) {
  return `UPDATE users
            JOIN tokens ON users.user_id = tokens.user_id
                SET ${key} = "${value}"
                    WHERE tokens.token LIKE "${token}";`;
}

function getUserIDFromToken(token) {
  return `SELECT users.user_id FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE "${token}";`;
}

function getUserStaffCodeFromID(id) {
  return `SELECT staffcode FROM users
                  WHERE users.user_id LIKE "${id}";`;
}

function getUserLevelFromID(id) {
  return `SELECT user_level FROM users
              WHERE users.user_id LIKE "${id}";`;
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
                        WHERE groups.user_id LIKE "${id}";`;
}

module.exports = {
  addAUser,
  addAToken,
  deleteAToken,
  deleteAUser,
  updateAUser,
  getUserIDFromToken,
  getUserDetailsFromToken,
  getUserStaffCodeFromID,
  getUserLevelFromID,
  getUserIDFromStaffCode,
  getAllUsers,
  deleteAllTokens,
  getUserManager,
  getUserGroups,
};
