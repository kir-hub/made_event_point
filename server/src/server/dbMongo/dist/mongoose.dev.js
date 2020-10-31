"use strict";

var mongoose = require('mongoose');

var path = require('path');

var env = process.env.NODE_ENV || 'development';
var configPath = path.join(__dirname, '..', 'config/mongoConfig.json');

var config = require(configPath)[env];

mongoose.connect("mongodb://".concat(config.host, ":").concat(config.port, "/").concat(config.database), //${ config.port } 27017
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    process.exit(1);
  }
});
mongoose.set('debug', env === 'development');
module.exports = mongoose;