const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing (CORS)
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

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
});

// Allows the client (broswer) to connect with more than one server at a time e.g. Server A is the webpage but makes an ajax call to Server B to request for data. It is a security mechanism for browsers only. CORS can also give specific access to other
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Go to /products to see products");
});

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

// app.get("/products/add", (req, res) => {
//   const { name, price } = req.query;
//   const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES ("${name}", ${price})`;

//   // let data = {
//   //   name: req.body.name,
//   //   price: req.body.price
//   // };

//   console.log(req.query.name);

//   connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       return res.send("Successfully added products!");
//     }
//   });
//   // res.send("adding product");
// });

app.post("/products/add", (req, res) => {
  // const { name, price } = req.body;
  // const data = {
  //   name: req.body.name,
  //   price: req.body.price
  // };

  // console.log(data.name);
  // console.log(data.price);

  console.log(req.body);

  // const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES ("${name}", ${price})`;

  // console.log(req.query.name);

  // connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
  //   if (err) {
  //     return res.send(err);
  //   } else {
  //     return res.send("Successfully added products!");
  //   }
  // });
  // res.send("adding product");
});

app.listen(4000, () => {
  console.log(`Products server is listening on port 4000`);
});
