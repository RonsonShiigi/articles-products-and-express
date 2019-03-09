// const knex = require("./database");

knex
  .select()
  .from("products_table")
  .then(products_table => {
    console.log(products_table);
    console.log("process.env", process.env);
    process.exit();
  });

// knex("products_table").insert({ name: "Kung Fu Monkey" });
