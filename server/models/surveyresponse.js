var bookshelf = require('../config/connection');


module.exports = bookshelf.model('SurveyResponse', {
    tablename: 'surveyresponses',
    hasTimestamps: true
});
