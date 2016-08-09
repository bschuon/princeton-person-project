'use strict';

process.env.NODE_ENV = 'test';

var Knex = require('knex');
var settings = require('../config/db');
var childProcess = require('child_process');

function createDB(name) {
  return new Promise(function (resolve, reject) {
    var child = childProcess.exec('createdb ' + name);
    child.on('exit', function () {
      resolve()
    });
    child.on('error', function () {
      reject()
    })
  })
}

Promise.all([
  createDB(settings.connection.database)
]).then(function () {
  console.log("Created test databases");
  return Promise.all([function () {
    var client = Knex(settings);

    return client.migrate.latest().then(function () {
      console.log('database migrations complete');
      return client.destroy()
    })
  }]).then(function () {
    console.log('All migrations complete')
  })
}).catch(function (err) {
  console.log(err);
});
