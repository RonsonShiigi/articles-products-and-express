var express = require("express");
var router = express.Router();
const DS_Products = require("../db/products");

//loads products home page
router.get("/", (req, res) => {
  let allProducts = DS_Products.getAllProducts();
  console.log(allProducts);
  res.render("products", { allProducts });
});

//loads specific products via id number
router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log("id", id);
  const product = DS_Products.getProductById(id);
  console.log(product);
  res.render("productSpecs", product);
});

//allows clients to create new products
router.post("/", (req, res) => {
  let newProduct = req.body;
  console.log(newProduct);
  DS_Products.createProduct(
    newProduct.name,
    newProduct.price,
    newProduct.inventory
  );
  res.send("you have created a new product");
});
module.exports = router;
