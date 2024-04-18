function findUserByEmailAndPassword() {
  return `SELECT users.user_id AS userId FROM users
            WHERE email LIKE ? AND password LIKE ?;`;
}

function addTokenOnLogin() {
  return `INSERT INTO tokens
                (user_id, token)
                    VALUES
                        (?, ?);`;
}

function deleteAToken() {
  return `DELETE tokens FROM tokens
              WHERE tokens.token LIKE ?;`;
}

function deleteAllTokens() {
  return `DELETE tokens FROM tokens
              WHERE tokens.user_id LIKE ?;`;
}

module.exports = {
  findUserByEmailAndPassword,
  addTokenOnLogin,
  deleteAToken,
  deleteAllTokens,
};
