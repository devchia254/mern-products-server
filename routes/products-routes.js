module.exports = (app) => {
  const sql = require("../models/mysql-db.js");

  // -- Controllers -- //
  const allProducts = require("../controllers/all-products.js");
  const addProduct = require("../controllers/add-product.js");
  const getProduct = require("../controllers/get-product.js");
  const updateProduct = require("../controllers/update-product.js");
  const deleteProduct = require("../controllers/delete-product.js");

  // -- Definining API endpoints -- //

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
    getProduct.handleGetProduct(req, res, sql);
  });

  // Update product
  app.put("/products/:id", (req, res) => {
    updateProduct.handleUpdateProduct(req, res, sql);
  });

  // Delete a product by id
  app.delete("/products/:id", (req, res) => {
    deleteProduct.handleDeleteProduct(req, res, sql);
  });
};
