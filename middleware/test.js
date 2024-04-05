const { getUserIndexById } = require("../routes/utils");

//logging middleware
function logging(req, res, next) {
  console.log("Get verb used to access / route");
  next(); //without it program ends here
}

//hacker prevent middles ware
function userAgent(req, res, next) {
  console.log(req.headers["user-agent"]);

  if (req.headers["user-agent"].includes("insomnia")) {
    res.status(400).send("We do not support the usage of API from Insomnia");
  } else {
    next();
  }
}

//Auth Middleware

function checkToken(req, res, next) {
  const user = req.users.find((user) => {
    return user.token === Number(req.headers.token);
  });

  if (user) {
    req.authedUser = user;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { logging, userAgent, checkToken };
