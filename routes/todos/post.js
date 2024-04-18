const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");
const { addTodo } = require("../../mysql/todoQueries");
const { getUserManager } = require("../../mysql/userQueries");

//handle requests for dynamic data

//Post todo
router.post("/postTodo", checkToken, async (req, res) => {
  const id = req.authenticatedUserId;
  const result = await asyncMySQL(getUserManager(), [id]);

  if (result.length === 0) {
    manager = null;
  } else {
    manager = result[0].lineManager;
  }
  const { name, body, priority = 0, completeBy = id, category = 1 } = req.body;

  if (!name || !body) {
    res.send({ status: 0, reason: "Missing Title and/or Body of Todo" });
    return;
  }

  try {
    await asyncMySQL(addTodo(), [
      name,
      body,
      priority,
      completeBy,
      manager,
      id,
      category,
    ]);
  } catch (e) {
    console.log(e);
    res.send({
      status: 0,
      reason: `Unable to add todo due to "${e.sqlMessage}"`,
    });
  }
  res.send({ status: 1, reason: "todo added" });
});

module.exports = router;
