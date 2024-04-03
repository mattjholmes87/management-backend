const express = require("express");
const server = express();
const todoData = require("./todoData.json");

server.use(express.static("public")); //allows access to items in public file without writing a direct route for static files

//handle requests for dynamic data

//Set number of Todos
server.get("/todoData/:count/:manager", (req, res) => {
  const { count = todoData.length, manager } = req.params; //deconstruct and set default count of full set of data

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
server.get("/randomTodoData", (req, res) => {
  const randomNum = Math.floor(Math.floor(Math.random() * todoData.length));
  res.send(todoData[randomNum]);
});

const PORT = process.env.PORT || 6001; //use server port but if not use 6001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
