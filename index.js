const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing (CORS)
const mysql = require("mysql");

const app = express();

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

// Allows the client (broswer) to connect with more than one server at a time e.g. Server A is the webpage but makes an ajax call to Server B to request for data. It is a security mechanism for browsers only. CORS can also give specific access to other
app.use(cors());
app.use(express.json()); //Express's built-in body-parser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Go to /products to see products");
});

app.get("/products", (req, res) => {
  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";
  getConnection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      console.log(`Failed to display products: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.json({
      dataBaby: results,
    });
    console.log("Products was fetched successfully!");
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  // console.log(req);
  // res.end();
  const SELECT_PRODUCT_ID_QUERY = "SELECT * FROM products where product_id = ?";
  getConnection.query(SELECT_PRODUCT_ID_QUERY, productId, (err, results) => {
    if (err) {
      console.log(`Failed to display product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.json(results);
    console.log("Product was fetched successfully!");
  });
});

app.post("/products/add", (req, res) => {
  const { name, price } = req.body;

  // console.log(name);
  // console.log(price);

  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES ("${name}", ${price})`;

  getConnection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      console.log(`Failed to add product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.send("Successfully added products!");
    console.log(`Product added with id: ${results.insertId}`);
  });
});

app.delete("products/delete", (req, res) => {
  res.send(`Delete page received!`);
  // var id;
  // var sql = "DELETE FROM products WHERE id = ? ";
  // getConnection.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(`Failed to delete product: ${err}`);
  //     res.sendStatus(500);
  //     return;
  //   }
  //   console.log("Number of records deleted: " + result.affectedRows);
  // });
});

app.listen(4000, () => {
  console.log(`Products server is listening on port 4000`);
});
