/*
* 这里存放常用的一些方法
*/

var path = require('path');
var fs = require('fs');

const mkdirs = function(dirpath, mode, callback){
  fs.exists(dirpath,function(exists){
    if(exists){
      callback(dirpath);
    }else{
      mkdirs(path.dirname(dirpath), mode, function(){
        fs.mkdir(dirpath,mode,callback);
      })
    }
  })
}

const writeFile = function(name, file, callback){
  fs.writeFile(`${process.env.PWD}/public/uploads/${name}`, file, function(err){
    if(err){
      console.log(err);
      callback(err,null)
    }else{
      callback(null,1);
    }
  })
}

const decodeBase64Image = function(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

module.exports = {
  mkdirs: mkdirs,
  writeFile: writeFile,
  decodeBase64Image: decodeBase64Image
};