
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_versions', function (t) {
    t.string('question_id').references('questions.id');
    t.integer('version_id').references('versions.id');
  });
};

exports.down = function(knex, Promise) {

};
