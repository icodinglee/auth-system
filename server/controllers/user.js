const User = require('../models/user');

// View Profile Route
exports.viewProfile = function(req, res, next) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) {
      res.status(404).json({ error: '您要访问的用户信息不存在！' });
      return;
    } else {
      res.status(200).json({
        username: user.username,
        nickname: user.nickname,
        address: user.address,
        postalcode: user.postalcode,
        avatar_url: user.avatar_url,
        id: user._id
      });
    }
  });
}

// Edit Profile Route
exports.editProfile = function(req, res, next) {
  User.findById({_id: req.params.uid}, function(err, user) {
    if (err) {
      return res.send(err);
    }
    for (prop in req.body) {
      user[prop] = req.body[prop];
    }
    user.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.status(200).json({
        message: '用户信息更新成功！',
        username: user.username,
        nickname: user.nickname,
        address: user.address,
        postalcode: user.postalcode,
        avatar_url: user.avatar_url,
        id: user._id
      });
    });
  });
}
