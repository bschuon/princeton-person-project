var bookshelf = require('../config/connection');
var _ = require('lodash');

var User = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  surveys: function() {
    return this.hasMany('Survey');
  },
  responses: function() {
    return this.hasMany('Response');
  },
  verifyToken: function(token) {
    console.log('verifyToken:', token);
    var user = this;
    return new Promise(function(resolve, reject) {
      console.log('inside promise');
      if (user.attributes.email_verified) {
	console.log('email_verified');
	resolve(user);
      } else if (user.attributes.email_verify_token.toLowerCase() == token.toLowerCase()) {
	console.log('token verified');
	user.attributes.email_verified = true;
	user.save().then(function(user) {
	  resolve(user);
	}).catch(function(err) {
	  console.log('user.save() error:', err);
	  reject(err || 'unknown error');
	});
      } else {
	console.log('token does not match');
	reject('token does not match');
      }
    });
    console.log('verifying token:', token);
  }
});

module.exports = User;
