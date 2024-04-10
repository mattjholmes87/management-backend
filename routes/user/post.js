const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getUserByEmail, getRV, getRid } = require("../utils");
const { kw } = require("../../kw");
const asyncMySQL = require("../../mysql/driver");
const { addAUser, addAToken } = require("../../mysql/queries");

//Add a user
router.post("/new", async (req, res) => {
  let { email, password, firstname, surname, staffcode, user_level, school } =
    req.body;

  //Check they exist
  if (!email || !password || !staffcode || !firstname || !surname || !school) {
    res.send({ status: 0, reason: "Missing data to register" });
  }

  //manipulate input
  password = sha256(password + kw);

  //create token
  token = getRid();

  //talk to DB
  try {
    const result = await asyncMySQL(
      addAUser(
        email,
        password,
        firstname,
        surname,
        staffcode,
        school,
        user_level
      )
    );

    await asyncMySQL(addAToken(result.insertId, token));

    res.send({ status: 1, reason: "New user added", token: token });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Unable to add user" });
  }
});

module.exports = router;
