var bookshelf = require('../config/connection');
require('./completion');

module.exports = bookshelf.model('Score', {
  tableName: 'scores',
  hasTimestamps: true,
  completion: function(){
    return this.belongsTo('Completion');
  }
});
