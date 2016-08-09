var bookshelf = require('../config/connection');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = User;
