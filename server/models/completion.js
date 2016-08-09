var bookshelf = require('../config/connection');
require('./survey');
require('./version');
require('./answer');
require('./score');

module.exports = bookshelf.model('Completion', {
  tableName: 'completions',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  version: function(){
    return this.belongsTo('Version');
  },
  answers: function(){
    return this.hasMany('Answer');
  },
  scores: function(){
    return this.hasMany('Score');
  }
});
