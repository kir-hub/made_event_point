"use strict";

var fs = require('fs');

var path = require('path');

var multer = require('multer');

var ServerError = require('../errors/ServerError');

var env = process.env.NODE_ENV || 'development';
var devFilePath = path.resolve(__dirname, '../../../public/images');
var filePath = env === 'production' ? '/var/www/html/images/' : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true
  });
}

var storageContestFiles = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, filePath);
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var uploadAvatars = multer({
  storage: storageContestFiles
}).single('file');
var uploadContestFiles = multer({
  storage: storageContestFiles
}).array('files', 3);
var updateContestFile = multer({
  storage: storageContestFiles
}).single('file');
var uploadLogoFiles = multer({
  storage: storageContestFiles
}).single('offerData');

module.exports.uploadAvatar = function (req, res, next) {
  uploadAvatars(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }

    return next();
  });
};

module.exports.uploadContestFiles = function (req, res, next) {
  uploadContestFiles(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }

    return next();
  });
};

module.exports.updateContestFile = function (req, res, next) {
  updateContestFile(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }

    return next();
  });
};

module.exports.uploadLogoFiles = function (req, res, next) {
  uploadLogoFiles(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }

    return next();
  });
};