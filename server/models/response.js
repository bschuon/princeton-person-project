var bookshelf = require('../config/connection');
// var Survey = require('./survey');
// var User = require('./user');

var Response = bookshelf.model('Response', {
  tableName: 'responses',
  hasTimestamps: true,
  survey: function() {
    return this.belongsTo('Survey');
  },
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = Response;
