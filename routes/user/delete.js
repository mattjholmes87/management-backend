const express = require("express");
const router = express.Router();
const { checkToken, checkUserLevel } = require("../../middleware/test");
const {
  deleteAUser,
  deleteUserFromGroup,
  deleteUserGroup,
} = require("../../mysql/userQueries");
const asyncMySQL = require("../../mysql/driver");

//Delete a user
router.delete("/", checkToken, checkUserLevel, async (req, res) => {
  const level = req.authenticatedUserLevel;

  if (level >= 2) {
    res.send({ status: 0, reason: "User level too low" });
    return;
  }
  await asyncMySQL(deleteAUser(req.headers.user_id));

  res.send({ status: 1, reason: "User deleted" });
});

//delete user from group
router.delete("/groups", checkToken, checkUserLevel, async (req, res) => {
  const level = req.authenticatedUserLevel;
  const { user_id, group_id } = req.headers;
  if (level >= 4) {
    res.send({ status: 0, reason: "User level too low" });
    return;
  }

  try {
    await asyncMySQL(deleteUserFromGroup(user_id, group_id));
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to remove user from group due to "${e.sqlMessage}"`,
    });
    return;
  }

  res.send({ status: 1, reason: "User removed from group" });
});

//delete a group
router.delete("/grous/remove", checkToken, checkUserLevel, async (req, res) => {
  const level = req.authenticatedUserLevel;
  const { user_id, group_id } = req.headers;
  if (level >= 3) {
    res.send({ status: 0, reason: "User level too low" });
    return;
  }

  try {
    await asyncMySQL(deleteUserGroup(group_id));
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to remove group due to "${e.sqlMessage}"`,
    });
    return;
  }

  res.send({ status: 1, reason: "User group deleted" });
});

module.exports = router;
