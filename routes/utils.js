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

function getRV() {
  return Math.floor(Math.random() * 7000000000000000);
}

module.exports = {
  getUserByEmail,
  getUserIndexById,
  getUserByEmailAndPassword,
  getRV,
};
