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

module.exports = { addAUser, addAToken };
