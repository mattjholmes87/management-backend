const express = require("express");
const router = express.Router();
const todoData = require("../../todoData.json");

//handle requests for dynamic data

//Post todo
router.post("/postTodo", (req, res) => {
  console.log("post a todo");
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
