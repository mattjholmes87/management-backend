const express = require("express");
const {
  logging,
  userAgent,
  checkToken,
  checkUserLevel,
  checkGroupSchool,
} = require("./middleware/test");
const server = express();
const cors = require("cors");

//Middleware
server.use(cors()); //Turns off browser security
server.use(express.json()); //handle the body - wouldn't see body without this line as its sent seperately to the post request
server.use(express.static("public")); //allows access to items in public file without writing a direct route for static files

//Importing my router
server.use("/todos/get", require("./routes/todos/get"));
server.use("/todos/post", require("./routes/todos/post"));
server.use("/todos/delete", require("./routes/todos/delete"));
server.use("/todos/patch", require("./routes/todos/patch"));
server.use("/user/post", require("./routes/user/post"));
server.use("/user/delete", require("./routes/user/delete"));
server.use("/user/get", require("./routes/user/get"));
server.use("/user/patch", require("./routes/user/patch"));
server.use("/user/login", require("./routes/user/login"));
server.use("/meetings/get", require("./routes/meetings/get"));
server.use("/meetings/post", require("./routes/meetings/post"));
server.use("/meetings/delete", require("./routes/meetings/delete"));
server.use("/meetings/patch", require("./routes/meetings/patch"));

//logging middleware
server.use(logging, checkToken, checkUserLevel, checkGroupSchool);
// hacker prevent middles ware - remove for testing
// server.use(userAgent);

const PORT = process.env.PORT || 6001; //use server port but if not use 6001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
