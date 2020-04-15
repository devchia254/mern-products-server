const mysql = require("mysql");
const dbConfig = require("../config/db-config.js");

// Database Connection
const getConnection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

getConnection.connect((err) => {
  if (err) {
    console.log(`Error connecting to MySQL DB: ${err}`);
  }
  // console.log("MySQL DB is connected!");
});

module.exports = getConnection;
