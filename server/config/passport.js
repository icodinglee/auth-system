 // Importing Passport, strategies, and config
const passport = require('passport'),
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'username'
}

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: '亲，您的用户名不存在哦 :(' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "亲，您的密码无效 :(" }); }

      return done(null, user);
    });
  });
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._doc._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      console.log(user);
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
