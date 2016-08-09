var bookshelf = require('../config/connection');
require('./survey');
require('./question');

module.exports = bookshelf.model('Field', {
  tableName: 'fields',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  questions: function(){
    return this.belongsToMany('Question');
  }
});
