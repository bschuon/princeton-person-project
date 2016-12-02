var bookshelf = require('../config/connection');

var Survey = bookshelf.model('Survey', {
    tableName: 'surveys',
    hasTimestamps: true
});

module.exports = Survey;
