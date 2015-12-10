var User = require('../models/user');
var createUser = require('../lib/create_user');
var createAdmin = require('../lib/create_admin');

Promise.all([
  createAdmin("admin@admin.com", "admin1234"),
  createUser("user@user.com", "user1234")
]).then(function() {
  console.log("Users seeded successfully");
  process.exit();
}, function() {
  console.log("ERROR: users not seeded");
  process.exit(1);
});
