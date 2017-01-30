var bookshelf = require('../config/connection');

var User = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  surveys: function() {
    return this.hasMany('Survey');
  },
  responses: function() {
    return this.hasMany('Response');
  }
});

module.exports = User;
