const express = require("express");
const cors = require("cors"); // Cross Origin Resource Sharing (CORS)

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Express's built-in body-parser

// Server port listening
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Products server is listening on port ${port}`);
});

// Connect to Homepage
app.get("/", (req, res) => {
  res.send("Go to /products to see products");
});

// Defining API endpoints aka routes
const routes = require("./routes/products-routes.js");
routes(app);
