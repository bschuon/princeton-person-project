
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE versions ALTER COLUMN algorithm TYPE text;');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE versions ALTER COLUMN algorithm TYPE varchar(255);');
};
