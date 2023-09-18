/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("winners", (table) => {
        table.increments("id").primary();
        table.integer('participant_id').references('id').inTable('participants');
        table.integer('draw_id').references('id').inTable('draws');
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("winners");
};
