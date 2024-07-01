const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { updateTodoById, updateTodoDate } = require("../../mysql/todoQueries");
const { getDateTimeStamp, camelCaseToSnakeCase } = require("../utils");

//Update a User Todos - NEED TO ADD IN TRY CATCH
router.patch("/", checkToken, async (req, res) => {
  const userId = req.authenticatedUserId;
  console.log(req.body);
  const {
    todoId,
    name,
    body,
    priority,
    dueDate,
    completeBy,
    displayOn,
    completed,
    signedOff,
    meetingId,
    category,
  } = req.body;

  if (!todoId) {
    res.send({ status: 0, reason: "Missing Todo ID" });
    return;
  }

  if (
    !(
      name ||
      body ||
      priority ||
      dueDate ||
      completeBy ||
      displayOn ||
      completed ||
      signedOff ||
      meetingId ||
      category
    )
  ) {
    res.send({ status: 0, reason: "Missing or invalid data to update" });
    return;
  }

  for (const [key, value] of Object.entries(req.body)) {
    const keyArr = [
      "todoId",
      "name",
      "body",
      "priority",
      "dueDate",
      "completeBy",
      "createdBy",
      "createdOn",
      "displayOn",
      "completed",
      "signedOff",
      "meetingId",
      "category",
    ];
    if (key === "completed" || key === "signedOff") {
      let snakeKey = camelCaseToSnakeCase(key);
      await asyncMySQL(updateTodoById(snakeKey), [value, todoId, userId]);

      if (
        (key === "completed" && value != 0) ||
        (key === "signedOff" && value != 0)
      ) {
        await asyncMySQL(updateTodoById(`${snakeKey}_on`), [
          getDateTimeStamp(),
          todoId,
          userId,
        ]);
      }
      await asyncMySQL(updateTodoDate(snakeKey), [userId]);
    } else if (key === "priority") {
      await asyncMySQL(updateTodoById(key), [value, todoId, userId]);
    } else if (keyArr.includes(key)) {
      let snakeKey = camelCaseToSnakeCase(key);
      await asyncMySQL(updateTodoById(snakeKey), [value, todoId, userId]);
    } else {
      res.send({ status: 0, reason: "Invalid Key", key: key });
      return;
    }
  }

  res.send({ status: 1, reason: "Todo updated" });
});

module.exports = router;
