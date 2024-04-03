const express = require("express");
const server = express();

//Middleware
server.use(express.static("public")); //allows access to items in public file without writing a direct route for static files
server.use(express.json()); //handle the body - wouldn't see body without this line as its sent seperately to the post request

//Importing my router
server.use("/todos", require("./routes/todos"));
server.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 6001; //use server port but if not use 6001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
