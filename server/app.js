var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var path = require('path');

if (process.env.NODE_ENV !== 'production') { require('dotenv').load(); }
require('./config/passport')(passport);

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(cookieSession({ key: 'person.session', secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/users', require('./routes/api/v1/users')(passport));
app.use('/api/v1/surveys', require('./routes/api/v1/surveys'));
app.use('/api/v1/surveymodels', require('./routes/api/v1/surveymodels'));
app.use('/api/v1/survey-items', require('./routes/api/v1/survey_items'));
app.use('/api/v1/surveyresponses', require('./routes/api/v1/surveyresponses'));
app.use('/api/v1/admin/surveys', require('./routes/api/v1/admin/surveys'));
app.use('/api/v1/admin/surveymodels', require('./routes/api/v1/admin/surveymodels'));
app.use('/api/v1/admin/users', require('./routes/api/v1/admin/users'));


// send all routes to index.html and let angular handle the routing
app.use('*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

module.exports = app;
