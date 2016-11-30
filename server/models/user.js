// Importing Node packages required for schema
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

//================================
// User Schema
//================================
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  postalcode: {
  // if type is Number, all the zeros at the beginnig of the value will be removed.
    type: String
  }
},
{
  timestamps: true
});

//================================
// User ORM Methods
//================================

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
