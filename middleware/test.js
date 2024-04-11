const asyncMySQL = require("../mysql/driver");
const { getUserIDFromToken } = require("../mysql/userQueries");
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

async function checkToken(req, res, next) {
  const results = await asyncMySQL(getUserIDFromToken(req.headers.token));

  if (results.length) {
    console.log(results);
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
}

module.exports = { logging, userAgent, checkToken };
