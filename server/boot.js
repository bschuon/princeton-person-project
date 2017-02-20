require('./config/config');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var busboy = require('connect-busboy');
var passport = require('passport');
var path = require('path');

require('./config/passport')(passport);

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());
app.use(cookieParser('secret'));
app.use(cookieSession({ key: 'person.session', secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/config.js', require('./lib/config_service').router);
app.use('/api/v1/bootstrap', require('./api/v1/bootstrap'));
app.use('/api/v1/users', require('./api/v1/users')(passport));
app.use('/api/v1/surveys', require('./api/v1/surveys'));
app.use('/api/v1/responses', require('./api/v1/responses'));
app.use('/api/v1/admin/surveys', require('./api/v1/admin/surveys'));
app.use('/api/v1/admin/responses', require('./api/v1/admin/responses'));
app.use('/api/v1/admin/users', require('./api/v1/admin/users'));

// send all routes to index.html and let angular handle the routing
app.use('*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

module.exports = app;
