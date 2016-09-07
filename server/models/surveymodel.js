var bookshelf = require('../config/connection');

module.exports = bookshelf.model('SurveyModel', {
    tablename: 'surveymodels',
    hasTimestamps: true
});
