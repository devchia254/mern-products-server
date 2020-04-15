module.exports = (app) => {
  const sql = require("../models/mysql-db.js");

  //Controllers
  const allProducts = require("../controllers/allProducts.js");
  const addProduct = require("../controllers/addProduct.js");

  // Get all products
  app.get("/products", (req, res) => {
    allProducts.handleAllProducts(req, res, sql);
  });

  // Submit a product
  app.post("/products/add", (req, res) => {
    addProduct.handleAddProduct(req, res, sql);
  });

  // Get product id
  app.get("/products/:id", (req, res) => {
    //req.params.id is for testing purposes. Uses req.body.id for final production
    const productId = req.params.id;
    // console.log(req);
    // res.end();
    const SELECT_PRODUCT_ID_QUERY =
      "SELECT * FROM products where product_id = ?";
    sql.query(SELECT_PRODUCT_ID_QUERY, [productId], (err, results) => {
      if (err) {
        console.log(`Failed to display product: ${err}`);
        res.sendStatus(500);
        return;
      }

      res.json(results);
      console.log("Product was fetched successfully!");
    });
  });

  // Update product
  app.put("/products/:id", (req, res) => {
    // console.log(req.params.id);
    const productId = req.params.id;
    const productName = req.body.name;
    const productPrice = req.body.price;

    const UPDATE_PRODUCT =
      "UPDATE products SET name = ?, price = ? WHERE product_id = ?";

    sql.query(
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

    sql.query(DELETE_PRODUCTS_ID, [productId], (err, results) => {
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
};
