var bookshelf = require('../config/connection');

module.exports = bookshelf.model('SurveyModel', {
    tableName: 'surveymodels',
    hasTimestamps: true
});
