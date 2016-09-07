
exports.up = function(knex, Promise) {
    return knex.schema.createTable('surveymodels', function(t) {
	t.increments('id').primary();
	t.integer('version_id');
	t.integer('estimated_time');
	t.json('survey').notNullable();
	t.timestamps();
    }).then(function() {
	return knex.schema.createTable('surveyresponses', function(t) {
	    t.increments('id').primary();
	    t.integer('surveymodel_id').references('surveymodels.id');
	    t.integer('version_id');
	    t.string('user_id');
	    t.integer('recorded_time'); // number of seconds taken
	    t.json('response').notNullable();
	    t.timestamps();
	});

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('surveyresponses').then(function() {
	return knex.schema.dropTable('surveymodels');
    });
};
