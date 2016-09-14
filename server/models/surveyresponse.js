var bookshelf = require('../config/connection');
var SurveyModel = require('./surveymodel');


module.exports = bookshelf.model('SurveyResponse', {
    tableName: 'surveyresponses',
    hasTimestamps: true,
    surveyModel: function() {
	return this.belongsTo(SurveyModel);
    }
});
