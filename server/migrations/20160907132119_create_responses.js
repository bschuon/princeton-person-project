exports.up = function(knex, Promise) {
  return knex.schema.createTable('responses', function(t) {
    t.increments('id').primary();
    t.integer('survey_id').references('surveys.id');
    t.integer('user_id').references('users.id');
    t.integer('recorded_time'); // number of seconds taken
    t.json('data');
    t.json('merged');
    t.json('question_with_response_list');
    t.json('response_sheet_row');
    t.json('response_sheet_header');
    t.json('response_sheet');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('responses');
};
