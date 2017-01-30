var bookshelf = require('../config/connection');
var Response = require('./response');

var Survey = bookshelf.model('Survey', {
  tableName: 'surveys',
  hasTimestamps: true,
  responses: function() {
    return this.hasMany(Response);
  }
});

module.exports = Survey;
