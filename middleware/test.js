const asyncMySQL = require("../mysql/driver");
const {
  getUserIdFromToken,
  getUserLevelFromId,
  getGroupSchool,
  getUserSchoolCodeFromId,
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
  const results = await asyncMySQL(getUserIdFromToken(), [req.headers.token]);

  if (results.length) {
    req.authenticatedUserId = results[0].userId;
    req.authenticatedUserSchoolId = results[0].schoolId;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
}

async function checkUserLevel(req, res, next) {
  const results = await asyncMySQL(getUserLevelFromId(), [
    req.authenticatedUserId,
  ]);

  if (results.length) {
    req.authenticatedUserLevel = results[0].userLevel;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad Token for User Level" });
}

async function checkGroupSchool(req, res, next) {
  const { userId, groupId } = req.body;
  const result1 = await asyncMySQL(getGroupSchool(), [groupId]);
  const result2 = await asyncMySQL(getUserSchoolCodeFromId(userId));
  req.inputUserSchoolId = result2[0].schoolId;

  if (result1[0].schoolId === result2[0].schoolId) {
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
