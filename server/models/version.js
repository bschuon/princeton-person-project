var bookshelf = require('../config/connection');
require('./survey');
require('./question');
require('./completion');

module.exports = bookshelf.model('Version', {
  tableName: 'versions',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  questions: function(){
    return this.belongsToMany('Question');
  },
  completions: function(){
    return this.hasMany('Completion');
  }
});
