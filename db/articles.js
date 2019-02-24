class DS_Articles {
  constructor() {
    this.storage = [];
    this.idNum = 1;
    this.preArticles();
  }
  preArticles() {
    this.storage.push({
      title: "The King is Here",
      body: "Lebron James Dunks on YOU!",
      author: "JR Smith",
      urlTitle: "lebron"
    });
    this.idNum++;
    this.storage.push({
      title: "Rock Out the Right Way",
      body: "Feel It",
      author: "Jimmy Page",
      urlTitle: "rock"
    });
    this.idNum++;
  }
  getAllArticles() {
    console.log(this.storage);
    return this.storage.slice();
  }
  getArticleByTitle(title) {
    let result;
    console.log("title", title);
    this.storage.forEach(article => {
      if (article.title === title) {
        result = article;
      }
    });
    console.log("result", result);
    return result;
  }
}

module.exports = new DS_Articles();
