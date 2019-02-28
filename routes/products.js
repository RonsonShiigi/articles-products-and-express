var express = require("express");
var router = express.Router();
const DS_Products = require("../db/products");

//loads products home page
router.get("/", (req, res) => {
  let allProducts = DS_Products.getAllProducts();
  console.log(allProducts);
  res.render("products", { allProducts });
});

//renders a page to create new products
router.get("/new", (req, res) => {
  res.render("newProduct");
});

//renders editing page
router.get("/:id/edit", (req, res) => {
  const productId = Number(req.params.id);
  const product = DS_Products.getProductById(productId);
  console.log("edit");
  res.render("editProduct", product);
});

//renders delete confirmation page
router.get("/:id/delete", (req, res) => {
  const productId = Number(req.params.id);
  const product = DS_Products.getProductById(productId);
  console.log("delete", product);
  res.render("deleteProducts", product);
});

//loads specific products via id number
router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log("id", id);
  const product = DS_Products.getProductById(id);
  console.log("hi", req.params.id);
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
  res.redirect("/products");
  res.send("you have created a new product");
});

//allows edits via browser
router.post("/:id/edit", (req, res) => {
  let id = Number(req.params.id);
  const name = req.body.name;

  const price = req.body.price;
  const inventory = req.body.inventory;
  DS_Products.editProduct(id, name, price, inventory);
  console.log("newName", name);
  res.redirect("/products/" + id);
});

//allows clients to delete via browser
router.post("/:id/delete", (req, res) => {
  const productId = Number(req.params.id);
  DS_Products.deleteProduct(productId);
  res.redirect("/products");
});

//allows clients to delete via postman
router.delete("/", (req, res) => {
  let id = Number(req.body.id);
  DS_Products.deleteProduct(id);
  res.send("yay you deleted product " + id);
});

//allows clients to edit via postman
router.put("/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  let id = Number(req.params.id);
  let name = data.name;
  let price = data.price;
  let inventory = data.inventory;
  DS_Products.editProduct(id, name, price, inventory);
  if (DS_Products.success === true) {
    res.send("you just edited" + name);
  } else if (DS_Products.success === false) {
    res.send("fuckOFF");
  }
});

module.exports = router;
