exports.up = function(knex) {
    return knex.schema.createTable("participants", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("phoneNumber").notNullable();
        table.string("hasWon").defaultTo(false);
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("participants");
};
