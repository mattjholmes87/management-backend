const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateTodoByID, updateTodoDate } = require("../../mysql/todoQueries");
const { getDateTimeStamp } = require("../utils");

//Update a User Todos - NOT WORKING SAME STRING ERROR
router.patch("/", checkToken, async (req, res) => {
  const userID = req.authenticatedUserID;

  const {
    todoID,
    name,
    body,
    priority,
    dueDate,
    displayOn,
    completed,
    category,
    signedOff,
  } = req.body;

  if (!todoID) {
    res.send({ status: 0, reason: "Missing Todo ID" });
    return;
  }

  if (
    !(name || body || priority || dueDate || displayOn || completed || category)
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key === "completed" || key === "signed_off") {
      await asyncMySQL(updateTodoByID(), [key, value, todoID, userID]);
      await asyncMySQL(updateTodoByID(), [
        `${key}_on`,
        getDateTimeStamp(),
        todoID,
        userID,
      ]);
      await asyncMySQL(updateTodoDate(), [key, userID, key]);
    } else if (key === "priority") {
      await asyncMySQL(updateTodoByID(), [key, value, todoID, userID]);
    } else {
      await asyncMySQL(updateTodoByID(), [key, value, todoID, userID]);
    }
  }

  res.send({ status: 1, reason: "Todo updated" });
});

module.exports = router;
