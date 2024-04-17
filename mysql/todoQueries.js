function addTodo() {
  return `INSERT INTO todos
                (name, body, priority, complete_by, managed_by, created_by, category)
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?);`;
}

function getTodoByID(id) {}

function getTodoByName(user_id, name) {
  return `SELECT * FROM todos
                WHERE todos.name LIKE "${name}" AND todos.complete_by = ${user_id};`;
}

function deleteTodoByID() {
  return `DELETE todos FROM todos
    WHERE todos.todo_id LIKE ? AND todos.complete_by = ?;`;
}

function updateTodoByID() {
  return `UPDATE todos 
                        SET ? = ?
                                 WHERE todos.todo_id LIKE ? AND todos.created_by = ?;`;
}

function updateTodoDate() {
  return `UPDATE todos
                  SET ?_on = NULL WHERE (created_by = ? AND ? = '0');`;
}

function getUserAllTodos() {
  return `SELECT * FROM todos
                WHERE todos.complete_by LIKE ? AND todos.display_on < ?;`;
}

function todoBooleanToggle(todo_id, key) {
  return `UPDATE todos SET ${key} = NOT ${key} WHERE todo_id = ${todo_id} AND ${key} != "0";`;
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
