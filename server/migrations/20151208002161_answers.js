
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', function (t) {
    t.increments('id').primary();
    t.integer('completion_id').references('completions.id');
    t.string('question_id').references('questions.id');
    t.text('value');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
