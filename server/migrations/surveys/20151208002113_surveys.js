
exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function (t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.text('description').notNullable();
    t.integer('est_completion_time_minutes').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};