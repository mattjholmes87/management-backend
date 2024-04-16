const asyncMySQL = require("../mysql/driver");
const {
  getUserIDFromToken,
  getUserLevelFromID,
} = require("../mysql/userQueries");

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
    req.authenticatedUserID = results[0].user_id;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
}

async function checkUserLevel(req, res, next) {
  const results = await asyncMySQL(getUserIDFromToken(req.headers.token));

  if (results.length) {
    authenticatedUserID = results[0].user_id;
    const resultTwo = await asyncMySQL(getUserLevelFromID(authenticatedUserID));
    req.authenticatedUserLevel = resultTwo[0].user_level;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad Token for User Level" });
}

module.exports = { logging, userAgent, checkToken, checkUserLevel };
