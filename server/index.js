var app = require('./app');
var port = process.env.PORT || 3000;
var debug = require('debug')('princeton-survey-app:server');
var bookshelf = require('./config/connection');

bookshelf.knex.migrate.latest().then(function() {
  var server = app.listen(port, function() {
    debug('Listening on Port:', port);
  });
});
