const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      moment = require('moment'),
      User = require('../models/user'),
      config = require('../config/main');
      passport = require('passport');

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json( { error: info.error }) }
    return res.json({
      token: 'JWT ' + generateToken(user),
      user: { name: user.username, nickname: user.nickname, id: user._id }
    });
  })(req, res, next);
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const nickname = req.body.nickname;
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).json({ error: '用户名已被注册' });
      }

      // If username is unique and password was provided, create account
      const user = new User({
        username: username,
        nickname: nickname,
        password: password
      });

      user.save(function(err) {
        if (err) { return next(err); }
        res.json({
          token: 'JWT ' + generateToken(user),
          user: { name: user.username, nickname: user.nickname, id: user._id }
        });
      });
  });
}
