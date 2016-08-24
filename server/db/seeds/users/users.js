if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '.env'});
}

var User = require('../../../models/user');
var createUser = require('../../../lib/create_user');
var createAdmin = require('../../../lib/create_admin');

Promise.all([
  createAdmin("admin@admin.com", "admin1234"),
  createUser("user@user.com", "user1234"),
  createUser("bob@user.com", "123"),
  createUser("sam@user.com", "123"),
  createUser("alice@user.com", "123")
]).then(function() {
  console.log("Users seeded successfully");
  process.exit();
}, function(err) {
  console.log("ERROR users not seeded:", err);
  process.exit(1);
});
