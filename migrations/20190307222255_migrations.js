exports.up = function(knex, Promise) {
  return knex.schema.createTable("products_table", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("price").notNullable();
    table.integer("inventory");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("products_table");
};
