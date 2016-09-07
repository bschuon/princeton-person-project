var bookshelf = require('../config/connection');


module.exports = bookshelf.model('SurveyResponse', {
    tablename: 'surveyresponses',
    hasTimestamps: true,
    survey: function() {
	return this.belongsTo('SurveyModel');
    }
});
