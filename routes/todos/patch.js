const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateTodoByID, updateTodoDate } = require("../../mysql/todoQueries");
const { getDateTimeStamp } = require("../utils");

//Update a User Todos
router.patch("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;

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
      const result = await asyncMySQL(updateTodoByID(todo_id, id, key, value));
      console.log(result);
      await asyncMySQL(
        updateTodoByID(todo_id, id, `${key}_on`, getDateTimeStamp())
      );
      await asyncMySQL(updateTodoDate(id, key));
    } else if (key === "priority") {
      await asyncMySQL(updateTodoByID(todo_id, id, key, value));
    } else {
      await asyncMySQL(updateTodoByID(todo_id, id, key, value));
    }
  }

  res.send({ status: 1, reason: "Todo updated" });
});

module.exports = router;
