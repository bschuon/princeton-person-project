
exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function (t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('description').notNullable();
    t.integer('est_completion_time_minutes').notNullable();
    t.boolean('is_featured').notNullable().defaultTo(false);
    t.integer('position');
    t.boolean('is_listed').notNullable().defaultTo(true);
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
