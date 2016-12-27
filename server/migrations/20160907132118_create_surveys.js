exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function(t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.integer('version').notNullable();
    t.string('status').notNullable();
    t.integer('est_time');
    t.json('schema').notNullable();
    t.json('scoring');
    t.timestamps();
    t.unique(['name', 'version']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('surveys');
};
