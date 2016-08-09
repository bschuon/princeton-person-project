
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id');
    t.string('username').notNullable().unique();
    t.string('email').unique();
    t.string('hashed_pass').notNullable();
    t.boolean('admin').defaultTo(false);
    t.boolean('completed_demographics').defaultTo(false);
    t.string('facebook_id');
    t.string('facebook_token');
    t.json('facebook_user_info')
    t.index('facebook_id', 'facebook_id_index');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
