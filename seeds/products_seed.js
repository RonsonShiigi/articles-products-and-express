exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products_table")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products_table").insert([
        { id: 1, name: "Monkey Piano", price: "199.99", inventory: 7 },
        { id: 2, name: "Tuba", price: "30.00", inventory: 200 },
        { id: 3, name: "Sticky Shots", price: "65.00", inventory: 32 }
      ]);
    });
};
