/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("draws", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("winners").notNullable();
        table.boolean('has_won').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("draws");
};
