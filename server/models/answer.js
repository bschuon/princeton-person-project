var bookshelf = require('../config/connection');
require('./completion');
require('./question');

module.exports = bookshelf.model('Answer', {
  tableName: 'answers',
  hasTimestamps: true,
  completion: function(){
    return this.belongsTo('Completion');
  },
  question: function(){
    return this.belongsTo('Question');
  }
});
