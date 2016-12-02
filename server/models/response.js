var bookshelf = require('../config/connection');
var Survey = require('./survey');

var Response = bookshelf.model('Response', {
    tableName: 'responses',
    hasTimestamps: true,
    surveyModel: function() {
	return this.belongsTo(Survey);
    }
});

module.exports = Response;
