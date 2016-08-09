var bookshelf = require('../config/connection');
require('./version');
require('./question');
require('./field');
require('./completion');

module.exports = bookshelf.model('Survey', {
  tableName: 'surveys',
  hasTimestamps: true,
  versions: function(){
    return this.hasMany('Version');
  },
  questions: function(){
    return this.hasMany('Question');
  },
  fields: function(){
    return this.hasMany('Field');
  },
  completions: function(){
    return this.hasMany('Completion');
  }
});
