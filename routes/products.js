var express = require("express");
var router = express.Router();
const DS_Products = require("../db/products");
const knex = require("../database");
//loads products home page
router.get("/", (req, res) => {
  // let allProducts = DS_Products.getAllProducts();
  // console.log(allProducts);
  // res.render("products", { allProducts });

  // knex stuff
  knex
    .select("*")
    .from("products_table")
    .then(products_table => {
      console.log(products_table);
      res.render("products", { products_table });
    });
});

//renders a page to create new products
router.get("/new", (req, res) => {
  res.render("newProduct");
});

//renders editing page
router.get("/:id/edit", (req, res) => {
  const productId = Number(req.params.id);
  console.log("id", productId);
  knex
    .select()
    .from("products_table")
    .where("id", productId)
    .then(products_table => {
      console.log(products_table);
      let obj = products_table[0];
      res.render("editProduct", obj);
    });

  // const product = DS_Products.getProductById(productId);
});

//renders delete confirmation page
router.get("/:id/delete", (req, res) => {
  const productId = Number(req.params.id);
  knex
    .select()
    .from("products_table")
    .where("id", productId)
    .then(products_table => {
      let obj = products_table[0];
      res.render("deleteProducts", obj);
    });

  // const product = DS_Products.getProductById(productId);
});

//loads specific products via id number
router.get("/:id", (req, res) => {
  let daid = Number(req.params.id);
  // console.log("id", daid);
  knex
    .select()
    .from("products_table")
    .where("id", daid)
    .then(products_table => {
      // console.log(products_table);
      let obj = products_table[0];
      res.render("productSpecs", obj);
    });
  // const product = DS_Products.getProductById(id);
  // console.log("hi", req.params.id);
  // res.render("productSpecs", product);
});

//allows clients to create new products
router.post("/", (req, res) => {
  let newProduct = req.body;
  let newName = newProduct.name;
  let newPrice = newProduct.price;
  let newInventory = newProduct.inventory;
  console.log("new inventory", newInventory);
  knex("products_table")
    .insert({
      name: newName,
      price: newPrice,
      inventory: newInventory
    })
    .then(data => {
      res.redirect("/products");
    })
    .catch(err => {
      console.log(err);
    });

  // DS_Products.createProduct(
  //   newProduct.name,
  //   newProduct.price,
  //   newProduct.inventory
  // );
});

//allows edits via browser
router.post("/:id/edit", (req, res) => {
  let productId = Number(req.params.id);
  const nameData = req.body.name;
  const priceData = req.body.price;
  const inventoryData = req.body.inventory;
  knex
    .select()
    .from("products_table")
    .where("id", productId)
    .update({
      name: nameData,
      price: priceData,
      inventory: inventoryData
    })
    .then(res.redirect("/products/" + productId));

  // DS_Products.editProduct(id, name, price, inventory);
});

//allows clients to delete via browser
router.post("/:id/delete", (req, res) => {
  const productId = Number(req.params.id);
  console.log("hi", req.params);
  knex
    .select()
    .from("products_table")
    .where("id", productId)
    .del()
    .then(res.redirect("/products"));

  // DS_Products.deleteProduct(productId);
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
