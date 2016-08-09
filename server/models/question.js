var bookshelf = require('../config/connection');
require('./survey');
require('./version');
require('./field');
require('./answer');

module.exports = bookshelf.model('Question', {
  tableName: 'questions',
  hasTimestamps: true,
  survey: function(){
    return this.belongsTo('Survey');
  },
  versions: function(){
    return this.belongsToMany('Version');
  },
  fields: function(){
    return this.belongsToMany('Field');
  },
  answers: function(){
    return this.hasMany('Answer');
  }
});
