var dbConfig = require('./db');
var knex = require('knex');
var bookshelf = require('bookshelf');

var conn = knex(dbConfig);

var knexBookshelf = bookshelf(conn);

knexBookshelf.plugin('registry');

module.exports = knexBookshelf;
