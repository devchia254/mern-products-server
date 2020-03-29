const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing (CORS)
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "react_sql"
});

connection.connect(err => {
  if (err) {
    return err;
  }
  console.log("MySQL DB is connected!");
});

// Allows the client (broswer) to connect with more than one server at a time e.g. Server A is the webpage but makes an ajax call to Server B to request for data. It is a security mechanism for browsers only. CORS can also give specific access to other
app.use(cors());
app.use(express.json()); //Express's built-in body-parser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Go to /products to see products");
});

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

app.get("/products", (req, res) => {
  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        dataBaby: results
      });
    }
  });
});

app.post("/products/add", (req, res) => {
  const { name, price } = req.body;

  // console.log(name);
  // console.log(price);

  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES ("${name}", ${price})`;

  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully added products!");
      // return res.json(results);
    }
  });
  // res.send("adding product");
});

app.listen(4000, () => {
  console.log(`Products server is listening on port 4000`);
});
