const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateTodoByID, updateTodoDate } = require("../../mysql/todoQueries");
const { getDateTimeStamp } = require("../utils");

//Update a User Todos - NOT WORKING SAME STRING ERROR
router.patch("/", checkToken, async (req, res) => {
  const user_id = req.authenticatedUserID;

  const {
    todo_id,
    name,
    body,
    priority,
    due_date,
    display_on,
    completed,
    category,
    signed_off,
  } = req.body;

  if (!todo_id) {
    res.send({ status: 0, reason: "Missing Todo ID" });
    return;
  }

  if (
    !(
      name ||
      body ||
      priority ||
      due_date ||
      display_on ||
      completed ||
      category
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key === "completed" || key === "signed_off") {
      await asyncMySQL(updateTodoByID(), [key, value, todo_id, user_id]);
      await asyncMySQL(updateTodoByID(), [
        `${key}_on`,
        getDateTimeStamp(),
        todo_id,
        user_id,
      ]);
      await asyncMySQL(updateTodoDate(), [key, user_id, key]);
    } else if (key === "priority") {
      await asyncMySQL(updateTodoByID(), [key, value, todo_id, user_id]);
    } else {
      await asyncMySQL(updateTodoByID(), [key, value, todo_id, user_id]);
    }
  }

  res.send({ status: 1, reason: "Todo updated" });
});

module.exports = router;
