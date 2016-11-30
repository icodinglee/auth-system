const File = require('../models/file');
const lib = require('../utils/common');
const config = require('../config/main');
const User = require('../models/user');
const passport = require('passport');

// Upload avatars
exports.uploadAvatar = function(req, res, next) {
  if(req.user._id.toString() !== req.body.uid) {
    console.log('hello')
    return res.status(401).json({ message: '您没有权限修改该用户头像'});
  }
  var info = req.body;
  // 为了避免重复文件名，需要根据时间生成name;
  var nameArr = info.filename.split('.');
  var ext = nameArr[nameArr.length - 1];
  var name = new Date().getTime()+'.' + ext;
  var boj = {
    type: info.type,
    size: info.size,
    name: name,
    oname: info.filename,
    isRemove: false
  }

  // 图片保存到磁盘
  var imageBuffer = lib.decodeBase64Image(info.file);
  lib.writeFile(`avatars/${name}`, imageBuffer.data, function(err, result) {
    const file = new File(boj);
    if(err) {
      res.status(500).json({error: '无法保存图片'});
    }
    file.save(function(err, data){
      var url = config.host+'/uploads/avatars/' + data.name;
      // 修改用户头像链接
      User.findById({_id: req.body.uid}, function(err, user) {
        user.avatar_url = url;
        user.save();
        res.status(200).json({ message: '头像修改成功了！', imageURL: url });
      });
    });
  })
}