const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { deleteTodoByID } = require("../../mysql/todoQueries");
const { getUserIDFromToken } = require("../../mysql/userQueries");

//Delete a User Todos
router.delete("/todoData", checkToken, async (req, res) => {
  const idObject = await asyncMySQL(getUserIDFromToken(req.headers.token));
  const id = idObject[0].user_id;

  const result = await asyncMySQL(deleteTodoByID(id, req.headers.todo_id));

  res.send({ status: 1, reason: "todo deleted" });
});

module.exports = router;
