var express = require("express");
var router = express.Router();
const DS_Articles = require("../db/articles");

//middleware that is specific to this router

//loads page for articles
router.get("/", (req, res) => {
  const artTitle = DS_Articles.getAllArticles();
  res.render("articles", { artTitle });
});

//renders a page for creating a new article
router.get("/new", (req, res) => {
  res.render("newArticle");
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
  res.send("yay you deleted " + title);
});

//loads specific articles
router.get("/:title", (req, res) => {
  const articleName = req.params.title.replace(/%20/g, "");
  //   console.log("articleName", articleName);

  const article = DS_Articles.getArticleByTitle(articleName);
  //   console.log("article", article);
  res.render("articlesSpec", article);
});

//allows client to edit current articles
router.put("/:title", (req, res) => {
  let title = req.params.title;
  let body = req.body.body;
  let author = req.body.author;
  let urlTitle = req.body.urlTitle;
  let edit = DS_Articles.editArticle(title, body, author, urlTitle);

  console.log("success is", DS_Articles.success);
  if (DS_Articles.success === true) {
    res.send("You have edited " + title);
  } else if (DS_Articles.success === false) {
    res.send("fuck off");
  }
});

module.exports = router;
