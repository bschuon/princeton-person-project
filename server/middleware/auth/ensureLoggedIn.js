function ensureLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json({error: "Username/password invalid"});
  } else if (!req.user.email_verified) {
    res.status(401).json({error: "User not verified."});
  } else {
    next();
  }
}

module.exports = ensureLoggedIn;
