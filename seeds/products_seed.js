exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products_table")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products_table").insert([
        { name: "Monkey Piano", price: "199.99", inventory: 7 },
        { name: "Tuba", price: "30.00", inventory: 200 },
        { name: "Sticky Shots", price: "65.00", inventory: 32 }
      ]);
    });
};
