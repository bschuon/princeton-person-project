var randomstring = require('randomstring');

var emailVerifyToken = function() {
  return randomstring.generate({
    length: 12,
    charset: 'hex'
  });
};

module.exports = {
  emailVerifyToken: emailVerifyToken
};
