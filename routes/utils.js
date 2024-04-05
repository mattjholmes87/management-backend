function getUserByEmail(users, email) {
  return users.find((user) => {
    return user.email === email;
  });
}

function getUserIndexById(users, id) {
  return users.findIndex((user) => {
    return user.id === Number(id);
  });
}

module.exports = { getUserByEmail, getUserIndexById };
