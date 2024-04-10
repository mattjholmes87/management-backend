const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "intray",
});

connection.connect();

function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject();
        return;
      }

      resolve(results);
    });
  });
}

module.exports = asyncMySQL;
