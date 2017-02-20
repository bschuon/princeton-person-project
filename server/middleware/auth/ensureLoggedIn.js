function ensureLoggedIn(req, res, next) {
  console.log('ensureLoggedIn', JSON.stringify(req.user));
  if (!req.isAuthenticated()) {
    res.status(401).json({error: "Username/password invalid"});
  } else if (!req.user.email_verified) {
    res.status(401).json({error: "User not verified."});
  } else {
    console.log('ensureLoggedIn: true');
    next();
  }
}

module.exports = ensureLoggedIn;
