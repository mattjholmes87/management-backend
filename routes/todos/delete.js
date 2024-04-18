const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { deleteTodoById } = require("../../mysql/todoQueries");

//Delete a User Todos
router.delete("/", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;

  try {
    const result = await asyncMySQL(deleteTodoById(), [
      req.headers.todo_id,
      id,
    ]);
  } catch (e) {
    res.send({
      status: 0,
      reason: `Unable to delete todo due to "${e.sqlMessage}"`,
    });
  }

  res.send({ status: 1, reason: "todo deleted" });
});

module.exports = router;
