const { body, validationResult } = require("express-validator");

function isAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
}

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
}

function registerValidator() {
  body("username").isEmpty(), body("password").isEmpty({ min: 5 });
}

module.exports = { isAuth, isLoggedIn,registerValidator };
