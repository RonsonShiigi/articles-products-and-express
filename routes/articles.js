var express = require("express");
var router = express.Router();

//middleware that is specific to this router

router.get("/", (req, res) => {
  res.render("articles");
});

module.exports = router;
