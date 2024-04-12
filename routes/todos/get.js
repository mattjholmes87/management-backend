const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { getUserAllTodos } = require("../../mysql/todoQueries");
const { getDateTimeStamp } = require("../utils");

//Get User Todos - currently visible by date
router.get("/todoData", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;
  const timeDateStamp = getDateTimeStamp();
  const todos = await asyncMySQL(getUserAllTodos(id, timeDateStamp));
  res.send(todos);
});

//random Todo
router.get("/randomTodoData", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;
  const timeDateStamp = getDateTimeStamp();
  const todos = await asyncMySQL(getUserAllTodos(id, timeDateStamp));

  const randomNum = Math.floor(Math.floor(Math.random() * todos.length));

  res.send(todos[randomNum]);
});

module.exports = router;
