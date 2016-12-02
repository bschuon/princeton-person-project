var User = require('../models/user');

var ConfigService = {
  router: function(req, res, next) {
    User.where({
      admin: true
    }).count().then(function(adminCount) {
      User.count().then(function(userCount) {
	var adminCountInt = parseInt(adminCount, 10);
	var userCountInt = parseInt(userCount, 10);
	var config = {
	  admins: adminCountInt,
	  users: userCountInt,
	  isBootstrapped: adminCountInt > 0
	};
	res.send("var CONFIG = " + JSON.stringify(config) + ";");
      });
    });
  }
};

module.exports = ConfigService;
