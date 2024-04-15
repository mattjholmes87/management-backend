const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { addTodo } = require("../../mysql/todoQueries");
const { getUserManager } = require("../../mysql/userQueries");

//handle requests for dynamic data

//Post todo
router.post("/postTodo", checkToken, async (req, res) => {
  const id = req.authenticatedUserID;
  const manager = await asyncMySQL(getUserManager(id));

  const {
    name,
    body,
    priority = 0,
    completed = 0,
    complete_by = id,
    category = 1,
  } = req.body;

  try {
    await asyncMySQL(
      addTodo(
        name,
        body,
        priority,
        completed,
        complete_by,
        manager[0].line_manager,
        id,
        category
      )
    );
    res.send({ status: 1, reason: "todo added" });
  } catch (e) {
    console.log(e);
    res.send({
      status: 0,
      reason: `Unable to add todo due to "${e.sqlMessage}"`,
    });
  }
});

module.exports = router;
