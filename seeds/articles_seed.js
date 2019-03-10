exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("articles_table")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("articles_table").insert([
        { title: "Nazi Zombies", body: "KILL THEM ALL", author: "Sgt Pepper" },
        {
          title: "Strength of the All Mighty",
          body: "da guy is huge",
          author: "Mr. T"
        },
        {
          title: "Chicken Fiddle",
          body: "Play that funky music lil guy",
          author: "Dee Guy"
        }
      ]);
    });
};
