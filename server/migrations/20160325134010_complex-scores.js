
exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE scores ALTER COLUMN value TYPE text;');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE scores ALTER COLUMN value TYPE float;');
};
