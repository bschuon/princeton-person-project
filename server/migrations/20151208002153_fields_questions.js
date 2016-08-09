
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fields_questions', function (t) {
    t.string('field_id').references('fields.id');
    t.string('question_id').references('questions.id');
  });
};

exports.down = function(knex, Promise) {

};
