const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { deleteTodoByID } = require("../../mysql/todoQueries");

//Delete a User Todos
router.delete("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

  const result = await asyncMySQL(deleteTodoByID(id, req.headers.todo_id));

  res.send({ status: 1, reason: "todo deleted" });
});

module.exports = router;
