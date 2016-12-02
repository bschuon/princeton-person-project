exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function(t) {
    t.increments('id').primary();
    t.string('key').notNullable();
    t.string('status').notNullable();
    t.integer('estimated_time');
    t.json('survey').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('surveys');
};
