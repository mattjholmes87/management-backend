const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { getRid } = require("../utils");
const { kw } = require("../../kw");
const asyncMySQL = require("../../mysql/driver");
const {
  addAUser,
  addAToken,
  addUserToGroups,
  addUserGroup,
  updateUserGroupNames,
  updateUserSchoolNames,
} = require("../../mysql/userQueries");
const {
  checkToken,
  checkUserLevel,
  checkGroupSchool,
} = require("../../middleware/test");

//Add a user
router.post("/new", async (req, res) => {
  let { email, password, firstname, surname, staffcode, school_id } = req.body;

  //Check they exist
  if (
    !email ||
    !password ||
    !staffcode ||
    !firstname ||
    !surname ||
    !school_id
  ) {
    res.send({ status: 0, reason: "Missing data to register" });
  }

  //manipulate input
  password = sha256(password + kw);

  //create token
  token = getRid();

  //talk to DB
  try {
    const result = await asyncMySQL(addAUser(), [
      email,
      password,
      firstname,
      surname,
      staffcode,
      school_id,
    ]);

    await asyncMySQL(addAToken(), [result.insertId, token]);
    await asyncMySQL(updateUserSchoolNames(), [result.insertId]);

    res.send({ status: 1, reason: "New user added", token: token });
  } catch (e) {
    console.log(e);
    res.send({
      status: 0,
      reason: `Unable to add user due to "${e.sqlMessage}"`,
    });
  }
});

//Add user to group
router.post(
  "/groups",
  checkToken,
  checkUserLevel,
  checkGroupSchool,
  async (req, res) => {
    const level = req.authenticatedUserLevel;
    const schoolID = req.inputUserSchoolID;
    const { userID, groupID } = req.body;

    if (level >= 4) {
      res.send({ status: 0, reason: "User level too low" });
      return;
    }
    try {
      await asyncMySQL(addUserToGroups(), [userID, groupID, schoolID]);
      await asyncMySQL(updateUserGroupNames(), [userID]);
    } catch (e) {
      res.send({
        status: 0,
        reason: `Unable to add user to group due to "${e.sqlMessage}"`,
      });
      return;
    }
    res.send({ status: 1, reason: "User added to group" });
  }
);

//Add a new group
router.post("/groups/new", checkToken, checkUserLevel, async (req, res) => {
  const id = req.authenticatedUserID;
  const level = req.authenticatedUserLevel;
  const schoolid = req.authenticatedUserSchoolID;
  const { group_name } = req.body;

  if (level >= 3) {
    res.send({ status: 0, reason: "User level too low" });
    return;
  }
  try {
    await asyncMySQL(addUserGroup(), [group_name, schoolid]);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to add group due to "${e.sqlMessage}"`,
    });
    return;
  }
  res.send({ status: 1, reason: "New Group Added" });
});

module.exports = router;
