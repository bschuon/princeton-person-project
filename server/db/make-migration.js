'use strict';
var path = require("path");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: path.join(__dirname, '../../.env')});
}

var Knex = require('knex');
var settings = require('../config/db');

var client = Knex(settings);

client.migrate.make(process.argv[2], {
  directory: database.migrations.directory
}).then(function () {
  return client.destroy()
});