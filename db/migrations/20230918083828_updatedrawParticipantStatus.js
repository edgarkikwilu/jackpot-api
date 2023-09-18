exports.up = function(knex) {
    return knex.schema.alterTable("participants", (table) => {
        table.string('status').defaultTo('pending') //pending, won, discarded
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable("participants", (table) => {
        table.dropColumn('status')
    });
};
