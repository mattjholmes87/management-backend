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
  return `DELETE FROM tokens
                    WHERE token LIKE "${token}";`;
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

function getUserDetailsFromToken(token) {
  return `SELECT * FROM users
                    JOIN tokens ON users.user_id = tokens.user_id
                        WHERE tokens.token LIKE "${token}";`;
}

function getAllUsers() {
  return `SELECT * FROM users;`;
}

module.exports = {
  addAUser,
  addAToken,
  deleteAToken,
  deleteAUser,
  updateAUser,
  getUserIDFromToken,
  getUserDetailsFromToken,
  getAllUsers,
};
