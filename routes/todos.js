const express = require("express");
const router = express.Router();
const todoData = require("../todoData.json");

//handle requests for dynamic data

//Post todo
router.post("/postTodo", (req, res) => {
  console.log("post a todo");
  console.log(req.body);
  res.send(req.body);
});

//Set number of Todos
router.get("/todoData", (req, res) => {
  const { count = todoData.length, manager } = req.query; //deconstruct and set default count of full set of data

  //convert URL count to number
  let countAsNumber = Number(count);

  //convert NaN to 1
  if (Number.isNaN(countAsNumber) || countAsNumber < 1) {
    res.send("Invalid count selected");
    return; //ends function
  }

  //   let copy = { ...todoData }; this made a shallow copy and did not copy the children, this was linked to original!!!!
  let todos = [...todoData];

  if (manager) {
    todos = todos.filter((todo) => {
      return todo.manager !== undefined;
    }); //filter out undefined for manager cat
    todos = todos.filter((todo) => {
      return todo.manager.toUpperCase().includes(manager.toUpperCase());
    }); //filter out correct manager
  }

  //Make sure count is not larger than data set after filter
  todos.length = countAsNumber > todos.length ? todos.length : countAsNumber;

  res.send(todos);
});

//random Todo
router.get("/randomTodoData", (req, res) => {
  const randomNum = Math.floor(Math.floor(Math.random() * todoData.length));
  res.send(todoData[randomNum]);
});

module.exports = router;
