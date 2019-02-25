var express = require("express");
var router = express.Router();
const DS_Articles = require("../db/articles");

//middleware that is specific to this router

//loads page for articles
router.get("/", (req, res) => {
  const artTitle = DS_Articles.getAllArticles();
  res.render("articles", { artTitle });
});

//allows clients to post new articles
router.post("/", (req, res) => {
  let newArt = req.body;
  DS_Articles.createArticle(
    newArt.title,
    newArt.body,
    newArt.author,
    newArt.urlTitle
  );
  res.send("good job");
});

//allows clients to delete articles
router.delete("/", (req, res) => {
  let title = req.body.title;
  DS_Articles.deleteArticle(title);
  console.log(title);
  res.send("yay you deleted it");
});

//loads specific articles
router.get("/:title", (req, res) => {
  const articleName = req.params.title.replace(/%20/g, "");
  //   console.log("articleName", articleName);

  const article = DS_Articles.getArticleByTitle(articleName);
  console.log("article", article);
  res.render("articlesSpec", article);
});

//allows client to edit current articles
router.put("/:title", (req, res) => {
  let articleName = req.params.title;
  console.log(articleName);
});

module.exports = router;
