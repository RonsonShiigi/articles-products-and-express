var express = require("express");
var router = express.Router();
const DS_Articles = require("../db/articles");
const knex = require("../database");
//middleware that is specific to this router

//loads page for articles
router.get("/", (req, res) => {
  // const artTitle = DS_Articles.getAllArticles();
  knex
    .select()
    .from("articles_table")
    .then(articles_table => {
      console.log(articles_table);
      res.render("articles", { articles_table });
    });
});

//renders a page for creating a new article
router.get("/new", (req, res) => {
  res.render("newArticle");
});

//allows clients to post new articles
router.post("/", (req, res) => {
  let newArt = req.body;
  knex("articles_table")
    .insert({
      title: newArt.title,
      body: newArt.body,
      author: newArt.author
    })
    .then(data => {
      res.redirect("/articles");
    });
  // DS_Articles.createArticle(
  //   newArt.title,
  //   newArt.body,
  //   newArt.author,
  //   newArt.urlTitle
  // );
});

//loads specific articles
router.get("/:title", (req, res) => {
  const articleName = req.params.title.replace(/%20/g, "");
  console.log("articleName", articleName);
  knex
    .select()
    .from("articles_table")
    .where("title", articleName)
    .then(articles_table => {
      let obj = articles_table[0];
      res.render("articlesSpec", obj);
    });
  // const article = DS_Articles.getArticleByTitle(articleName);
  //   console.log("article", article);
});

//renders edit articles page
router.get("/:title/edit", (req, res) => {
  const articleName = req.params.title;
  knex
    .select()
    .from("articles_table")
    .where("title", articleName)
    .then(articles_table => {
      let obj = articles_table[0];
      res.render("editArticle", obj);
    });
});

//alows client to edit article via browser
router.post("/:title/edit", (req, res) => {
  const title = req.params.title;
  const newTitle = req.body.title;
  const newBody = req.body.body;
  const newAuthor = req.body.author;
  console.log("title", title);
  console.log("newTitle", newTitle);
  knex
    .select()
    .from("articles_table")
    .where("title", title)
    .update({
      title: newTitle,
      body: newBody,
      author: newAuthor
    })
    .then(res.redirect("/articles/" + newTitle));
});

//renders the delete confimation page
router.get("/:title/delete", (req, res) => {
  const articleName = req.params.title;
  knex
    .select()
    .from("articles_table")
    .where("title", articleName)
    .then(article_table => {
      let obj = article_table[0];
      res.render("deleteArticles", obj);
    });
});

//allows clients to delete posts via browser
router.post("/:title/delete", (req, res) => {
  const articleName = req.params.title;
  knex
    .select()
    .from("articles_table")
    .where("title", articleName)
    .del()
    .then(res.redirect("/articles"));
});

//allows clients to delete articles via postman
router.delete("/", (req, res) => {
  let title = req.body.title;
  DS_Articles.deleteArticle(title);
  console.log(title);
  res.send("yay you deleted " + title);
});

//allows client to edit current articles via postman
router.put("/:title", (req, res) => {
  let title = req.params.title;
  let newTitle = req.params.title;
  let body = req.body.body;
  let author = req.body.author;
  let urlTitle = req.body.urlTitle;
  let edit = DS_Articles.editArticle(title, newTitle, body, author, urlTitle);

  console.log("success is", DS_Articles.success);
  if (DS_Articles.success === true) {
    res.send("You have edited " + title);
  } else if (DS_Articles.success === false) {
    res.send("fuck off");
  }
});

module.exports = router;
