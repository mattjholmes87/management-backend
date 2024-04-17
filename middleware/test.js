const asyncMySQL = require("../mysql/driver");
const {
  getUserIDFromToken,
  getUserLevelFromID,
  getGroupSchool,
  getUserSchoolCodeFromID,
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
  const results = await asyncMySQL(getUserIDFromToken(), [req.headers.token]);

  if (results.length) {
    req.authenticatedUserID = results[0].user_id;
    req.authenticatedUserSchoolID = results[0].school_id;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
}

async function checkUserLevel(req, res, next) {
  const results = await asyncMySQL(getUserLevelFromID(req.authenticatedUserID));

  if (results.length) {
    req.authenticatedUserLevel = results[0].user_level;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad Token for User Level" });
}

async function checkGroupSchool(req, res, next) {
  const { user_id, group_id } = req.body;
  const result1 = await asyncMySQL(getGroupSchool(group_id));
  const result2 = await asyncMySQL(getUserSchoolCodeFromID(user_id));
  req.inputUserSchoolID = result2[0].school_id;

  if (result1[0].school_id === result2[0].school_id) {
    next();
    return;
  }
  res.send({ status: 0, reason: "Group does not belong to your school" });
}

module.exports = {
  logging,
  userAgent,
  checkToken,
  checkUserLevel,
  checkGroupSchool,
};
