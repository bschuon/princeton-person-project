exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id');
    t.string('username').notNullable().unique();
    t.string('email').unique();
    t.string('hashed_pass').notNullable();
    t.boolean('admin').defaultTo(false);
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
