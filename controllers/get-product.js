const getProduct = (req, res, sql) => {
  //req.params.id is for testing purposes. Uses req.body.id for final production
  const productId = req.params.id;
  // console.log(req);
  // res.end();
  const SELECT_PRODUCT_ID_QUERY = "SELECT * FROM products where product_id = ?";
  sql.query(SELECT_PRODUCT_ID_QUERY, [productId], (err, results) => {
    if (err) {
      console.log(`Failed to display product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.json(results);
    console.log("Product was fetched successfully!");
  });
};

module.exports = {
  handleGetProduct: getProduct,
};
