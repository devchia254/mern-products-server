const mysql = require("mysql");
// Database Connection
const getConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "react_sql",
});

getConnection.connect((err) => {
  if (err) {
    console.log(`Error connecting to MySQL DB: ${err}`);
  }
  // console.log("MySQL DB is connected!");
});

module.exports = getConnection;
