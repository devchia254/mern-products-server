const updateProduct = (req, res, sql) => {
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
};

module.exports = {
  handleUpdateProduct: updateProduct,
};
