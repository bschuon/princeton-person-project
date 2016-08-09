
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function (t) {
    t.increments('id').primary();
    t.integer('completion_id').references('completions.id');
    t.float('value');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
