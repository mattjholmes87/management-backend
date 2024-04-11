const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { addTodo } = require("../../mysql/todoQueries");
const {
  getUserManager,
  getUserIDFromToken,
} = require("../../mysql/userQueries");
const { getDateTimeStamp } = require("../utils");

//handle requests for dynamic data

//Post todo
router.post("/postTodo", checkToken, async (req, res) => {
  const idObject = await asyncMySQL(getUserIDFromToken(req.headers.token));
  const id = idObject[0].user_id;
  const manager = await asyncMySQL(getUserManager(id));

  const { name, body, priority = 0, complete_by = id, category = 1 } = req.body;

  await asyncMySQL(
    addTodo(
      name,
      body,
      priority,
      complete_by,
      manager[0].line_manager,
      id,
      category
    )
  );
  res.send({ status: 1, reason: "todo added" });
});

module.exports = router;
