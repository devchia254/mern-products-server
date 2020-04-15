const allProducts = (req, res, sql) => {
  // console.log(req.body);
  // res.end();

  const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";
  sql.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
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
};

module.exports = {
  handleAllProducts: allProducts,
};
