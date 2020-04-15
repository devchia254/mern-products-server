const addProduct = (req, res, sql) => {
  const { name, price } = req.body;

  // console.log(req.body);
  // res.send("Helloooooooooo");
  console.log("Name: ", name);
  console.log("Price: ", price);

  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES (?, ?)`;

  sql.query(INSERT_PRODUCTS_QUERY, [name, price], (err, results) => {
    if (err) {
      console.log(`Failed to add product: ${err}`);
      res.sendStatus(500);
      return;
    }

    res.send("Just added a product!");
    console.log(`Product added with id: ${results.insertId}`);
    // console.log(typeof results);
  });
};

module.exports = {
  handleAddProduct: addProduct,
};
