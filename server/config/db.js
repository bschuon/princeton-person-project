var config = require('./config');
var pg = require('pg');
var path = require('path');
pg.defaults.ssl = config.db.ssl;


module.exports = {
  //debug: true,
  client: 'pg',
  connection: {
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    charset: 'utf8'
  },
  pool: {
    min: 1,
    max: 10
  },
  migrations: {
    directory: path.join(__dirname, '../', 'migrations')
  }
};
