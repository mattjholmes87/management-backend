function addTodo(
  name,
  body,
  priority,
  complete_by,
  managed_by,
  created_by,
  category
) {
  return `INSERT INTO todos
                (name, body, priority, complete_by, managed_by, created_by, category)
                    VALUES
                        ("${name}", "${body}", "${priority}", "${complete_by}", "${managed_by}", "${created_by}", "${category}");`;
}

function getTodoByID(id) {}

function getTodoByName(user_id, name) {
  return `SELECT * FROM todos
  WHERE todos.name LIKE "${name}" AND todos.complete_by = "${user_id}";`;
}

function deleteTodoByID(user_id, todo_id) {
  return `DELETE todos FROM todos
    WHERE todos.todo_id LIKE "${todo_id}" AND todos.complete_by = "${user_id}";`;
}

function updateTodoByID() {
  return `;`;
}

function getUserAllTodos(id, dateTimeStamp) {
  return `SELECT * FROM todos
    WHERE todos.complete_by LIKE "${id}" AND todos.display_on < "${dateTimeStamp}";`;
}

function getUserNumberOfTodos() {
  return `;`;
}

function getUserPriorityUserTodos() {
  return `;`;
}

function getUserCategoryTodos() {
  return `;`;
}

function getManagerAllSetTodos() {
  return `;`;
}

module.exports = {
  addTodo,
  getTodoByID,
  getTodoByName,
  deleteTodoByID,
  updateTodoByID,
  getUserAllTodos,
  getUserPriorityUserTodos,
  getUserCategoryTodos,
  getUserNumberOfTodos,
  getManagerAllSetTodos,
};
