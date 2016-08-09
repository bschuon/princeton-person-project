
exports.up = function(knex, Promise) {
  return knex.schema.createTable('completions', function (t) {
    t.increments('id').primary();
    t.integer('survey_id').references('surveys.id');
    t.integer('version_id').references('versions.id');
    t.string('user_id');
    t.integer('recorded_time'); // number of seconds to take survey
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
