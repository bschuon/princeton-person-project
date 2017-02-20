var mailgun = require('../config/mailgun');

var sendVerifyTokenEmail = function(toAddress, token) {
  return new Promise(function(resolve, reject) {
    var text = `Thanks for signing up for the Princeton Person Project! Please activate your account by clicking the link below:

${process.env['APP_BASE_URL']}/users/verify?token=${token}
    `;
    var data = {
      from: process.env['EMAIL_DEFAULT_FROM'],
      to: toAddress,
      subject: 'Activate your Princeton Person Project account',
      text: text
    };
    mailgun.messages().send(data, function(err, body) {
      if (err) {
	reject(err);
      } else {
	resolve(body);
      }
    });
  });
};

var sendPasswordResetEmail = function(userId, toAddress, token) {
  return new Promise(function(resolve, reject) {
    var text = `Please click the link below to reset your password:

${process.env['APP_BASE_URL']}/users/${userId}/reset-password?token=${token}
    `;
    var data = {
      from: process.env['EMAIL_DEFAULT_FROM'],
      to: toAddress,
      subject: 'Reset your Princeton Person Project account password',
      text: text
    };
    mailgun.messages().send(data, function(err, body) {
      if (err) {
	reject(err);
      } else {
	resolve(body);
      }
    });
  });
};

module.exports = {
  sendVerifyTokenEmail: sendVerifyTokenEmail,
  sendPasswordResetEmail: sendPasswordResetEmail
};
