exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id');
    t.string('username').notNullable().unique();
    t.string('email').unique();
    t.string('email_verify_token');
    t.string('hashed_pass').notNullable();
    t.boolean('admin').defaultTo(false);
    t.boolean('researcher').defaultTo(false);
    t.boolean('email_verified').defaultTo(false);
    t.json('bio');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
