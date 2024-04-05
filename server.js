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
server.use("/todos/get", require("./routes/todos/get"));
server.use("/todos/post", require("./routes/todos/post"));
server.use("/user/post", require("./routes/user/post"));
server.use("/user/delete", require("./routes/user/delete"));
server.use("/user/get", require("./routes/user/get"));
server.use("/user/patch", require("./routes/user/patch"));
server.use("/user/login", require("./routes/user/login"));

//logging middleware
server.use(logging);
// hacker prevent middles ware - remove for testing
// server.use(userAgent);

const PORT = process.env.PORT || 6001; //use server port but if not use 6001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
