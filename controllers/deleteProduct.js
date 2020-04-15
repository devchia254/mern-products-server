const deleteProduct = (req, res, sql) => {
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
};

module.exports = {
  handleDeleteProduct: deleteProduct,
};
