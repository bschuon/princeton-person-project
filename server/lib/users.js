var User = require('../models/user');

module.exports = {
  getUsers: function () {
    return User.fetchAll();
  },
  getUser: function(user_id) {
    return new User({ id: user_id }).fetch();
  }
};
