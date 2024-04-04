const express = require("express");
const { logging, userAgent } = require("./middleware/test");
const server = express();
const userData = require("./users.json");

//User state
const users = userData;
const lastUserId = { value: 2385394 };

//Middleware
server.use(express.static("public")); //allows access to items in public file without writing a direct route for static files
server.use(express.json()); //handle the body - wouldn't see body without this line as its sent seperately to the post request
server.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  next();
}); //Middleware to add users array to the requets

//Importing my router
server.use("/todos", require("./routes/todos"));
server.use("/user", require("./routes/user"));

//logging middleware
server.use(logging);
//hacker prevent middles ware - remove for testing
// server.use(userAgent);

//Test script
server.get("/", (req, res) => {
  res.send("Hello from the GET method / route");
});

const PORT = process.env.PORT || 6001; //use server port but if not use 6001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
