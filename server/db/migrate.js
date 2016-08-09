'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '.env'});
}

var Knex = require('knex');
var settings = require('../config/db');
var client = Knex(settings);

if (process.argv[2] === 'rollback') {
  client.migrate.rollback().then(function () {
    console.log('database rollback complete');
    return client.destroy()
  })
} else {
  client.migrate.latest().then(function () {
    console.log('database migrations complete');
    return client.destroy()
  })
}
