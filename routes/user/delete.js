const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const { deleteAUser } = require("../../mysql/queries");
const asyncMySQL = require("../../mysql/driver");

//Delete a user
router.delete("/", async (req, res) => {
  await asyncMySQL(deleteAUser(req.headers.token));

  res.send({ status: 1, reason: "User deleted" });
});

module.exports = router;
