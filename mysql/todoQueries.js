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
                (name, body, priority, completed, complete_by, managed_by, created_by, category)
                    VALUES
                        ("${name}", "${body}", "${priority}", "${completed}", "${complete_by}", "${managed_by}", "${created_by}", "${category}");`;
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

function updateTodoByID(todo_id, user_id, key, value) {
  return `UPDATE todos 
                        SET ${key} = "${value}"
                                 WHERE todos.todo_id LIKE "${todo_id}" AND todos.created_by = "${user_id}";`;
}

function updateTodoDate(id, key) {
  return `UPDATE todos
                  SET ${key}_on = NULL WHERE (created_by = "${id}" AND ${key} = '0');`;
}

function getUserAllTodos(id, dateTimeStamp) {
  return `SELECT * FROM todos
                WHERE todos.complete_by LIKE "${id}" AND todos.display_on < "${dateTimeStamp}";`;
}

function todoBooleanToggle(todo_id, key) {
  return `UPDATE todos SET ${key} = NOT ${key} WHERE todo_id = "${todo_id}" AND ${key} != "0";`;
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
  updateTodoDate,
  getUserAllTodos,
  getUserPriorityUserTodos,
  getUserCategoryTodos,
  getUserNumberOfTodos,
  getManagerAllSetTodos,
  todoBooleanToggle,
};
