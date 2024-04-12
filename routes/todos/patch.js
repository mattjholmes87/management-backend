const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const {
  updateTodoByID,
  updateTodoCompletedDate,
  todoBooleanToggle,
  updateTodoSignedOffDate,
} = require("../../mysql/todoQueries");
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

  if (name) {
    await asyncMySQL(updateTodoByID(todo_id, id, "name", name));
  }
  if (body) {
    await asyncMySQL(updateTodoByID(todo_id, id, "body", body));
  }
  if (due_date) {
    await asyncMySQL(updateTodoByID(todo_id, id, "due_date", due_date));
  }
  if (display_on) {
    await asyncMySQL(updateTodoByID(todo_id, id, "display_on", display_on));
  }
  if (category) {
    await asyncMySQL(updateTodoByID(todo_id, id, "category", category));
  }
  if ("priority" in req.body) {
    await asyncMySQL(updateTodoByID(todo_id, id, "priority", priority));
  }
  if ("completed" in req.body) {
    await asyncMySQL(updateTodoByID(todo_id, id, "completed", completed));
    await asyncMySQL(
      updateTodoByID(todo_id, id, "completed_on", getDateTimeStamp())
    );
    await asyncMySQL(updateTodoCompletedDate(id));
  }
  if ("signed_off" in req.body) {
    await asyncMySQL(updateTodoByID(todo_id, id, "signed_off", signed_off));
    await asyncMySQL(
      updateTodoByID(todo_id, id, "signed_off_on", getDateTimeStamp())
    );
    await asyncMySQL(updateTodoSignedOffDate(id));
  }

  res.send({ status: 1, reason: "Todo updated" });
});

module.exports = router;
