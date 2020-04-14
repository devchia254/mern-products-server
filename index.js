const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing (CORS)
const mysql = require("mysql");

const app = express();

// Middlewares
app.use(express.json()); //Express's built-in body-parser
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

// Connect to Homepage
app.get("/", (req, res) => {
  res.send("Go to /products to see products");
});

// Get all products
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
    console.log("List of products fetched successfully!");
  });
});

// Submit a product
app.post("/products/add", (req, res) => {
  const { name, price } = req.body;

  // console.log(req.body);
  console.log("Name: ", name);
  console.log("Price: ", price);

  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES (?, ?)`;

  getConnection.query(INSERT_PRODUCTS_QUERY, [name, price], (err, results) => {
    if (err) {
      console.log(`Failed to add product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.send("Just added a product!");
    console.log(`Product added with id: ${results}`);
  });
});

// Get product id
app.get("/products/:id", (req, res) => {
  //req.params.id is for testing purposes. Uses req.body.id for final production
  const productId = req.params.id;
  // console.log(req);
  // res.end();
  const SELECT_PRODUCT_ID_QUERY = "SELECT * FROM products where product_id = ?";
  getConnection.query(SELECT_PRODUCT_ID_QUERY, [productId], (err, results) => {
    if (err) {
      console.log(`Failed to display product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.json(results);
    console.log("Product was fetched successfully!");
  });
});

app.put("/products/:id", (req, res) => {
  // console.log(req.params.id);
  const productId = req.params.id;
  const productName = req.body.name;
  const productPrice = req.body.price;

  const UPDATE_PRODUCT =
    "UPDATE products SET name = ?, price = ? WHERE product_id = ?";

  getConnection.query(
    UPDATE_PRODUCT,
    [productName, productPrice, productId],
    (err, results) => {
      if (err) {
        console.log(`Failed to update product: ${err}`);
        res.sendStatus(500);
        return;
      }
      console.log("Results msg: ", results.message);
      res.send("Product update was successful!");
    }
  );
});

// Delete a product by id
app.delete("/products/delete", (req, res) => {
  // console.log(req.params.id);
  console.log(req.body.id);

  const productId = req.body.id;

  var DELETE_PRODUCTS_ID = "DELETE FROM products WHERE product_id = ? ";

  getConnection.query(DELETE_PRODUCTS_ID, [productId], (err, results) => {
    if (err) {
      console.log(`Failed to delete product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.send("Deleting product was successful!");
    // console.log(result);
    console.log("Number of records deleted: " + results.affectedRows);
  });
});

// Server port listening
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Products server is listening on port 4000`);
});
