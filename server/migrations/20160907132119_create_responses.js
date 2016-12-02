exports.up = function(knex, Promise) {
  return knex.schema.createTable('responses', function(t) {
    t.increments('id').primary();
    t.integer('survey_id').references('surveys.id');
    t.string('user_id');
    t.integer('recorded_time'); // number of seconds taken
    t.json('response').notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('responses');
};
