const { kw } = require("../kw");
const sha256 = require("sha256");

function getUserByEmail(users, email) {
  return users.find((user) => {
    return user.email === email;
  });
}

function getUserByEmailAndPassword(users, email, password) {
  return users.find((user) => {
    return user.email === email && user.password === sha256(password + kw);
  });
}

function getUserIndexById(users, id) {
  return users.findIndex((user) => {
    return user.id === Number(id);
  });
}

function getUserIndexByToken(users, token) {
  return users.findIndex((user) => {
    return user.token.includes(token);
  });
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRid() {
  let uniqueId = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcedfghijklmnopqrstuvwxyz";
  let charsDate = (chars += Date.now());
  let charsLength = charsDate.length;
  const rndInt = randomIntFromInterval(1, 10);

  for (let i = 0; i < charsLength - rndInt; i++) {
    uniqueId += charsDate.charAt(Math.floor(Math.random() * charsLength));
  }

  return uniqueId;
}

function getDateTimeStamp() {
  let date = new Date();
  const mseconds = date.getMilliseconds();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dateTimeStamp =
    year +
    "-" +
    (month + 1) +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return dateTimeStamp;
}

module.exports = {
  getUserByEmail,
  getUserIndexById,
  getUserByEmailAndPassword,
  getRid,
  getUserIndexByToken,
  getDateTimeStamp,
};
