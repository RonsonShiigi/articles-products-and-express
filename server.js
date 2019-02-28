const express = require("express");
const hbs = require("express-handlebars");
let app = express();
const PORT = 8080;
const bp = require("body-parser");
const articles = require("./routes/articles");
const products = require("./routes/products");

// const products = require("./routes/products");

//middleware
app.use(express.static(__dirname + "/public"));
app.use(bp.urlencoded({ extended: true }));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", "hbs");
app.use("/articles", articles);
app.use("/products", products);

app.get("/", (req, res) => {
  res.render("homePage");
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
