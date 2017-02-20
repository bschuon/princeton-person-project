var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = {
  errors: function(user) {
    var errors = [];
    if(!user.username.trim()){
      errors.push("Username cannot be blank");
    }
    if(!user.password.trim()){
      errors.push("Password cannot be blank");
    }
    if(!(user.password === user.password_confirmation)){
      errors.push("Passwords do not match");
    }
    return errors;
  },
  userOrEmailExists: function (usernameOrEmail) {
    console.log('userOrEmailExists', usernameOrEmail);
    return new User().query({
      where: {
	username: usernameOrEmail.toLowerCase()
      },
      orWhere: {
	email: usernameOrEmail.toLowerCase()
      }
    }).fetch();
  },
  checkPassword: function (input, record) {
    return bcrypt.compareSync(input, record.hashed_pass);
  }
};
