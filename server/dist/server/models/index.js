'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var configPath = env === 'production' ? path.join(__dirname, '..', '..', '..', 'src/server/config/postgresConfig.json') : path.join(__dirname, '..', '/config/postgresConfig.json');

var config = require(configPath)[env];

var db = {};
var sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize["import"](path.join(__dirname, file));
  db[model.name] = model;
});
db['Contests'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  sourceKey: 'id'
});
db['Contests'].hasMany(db['Offers'], {
  foreignKey: 'contestId',
  targetKey: 'id'
});
db['Users'].hasMany(db['Offers'], {
  foreignKey: 'userId',
  targetKey: 'id'
});
db['Users'].hasMany(db['Contests'], {
  foreignKey: 'userId',
  targetKey: 'id'
});
db['Users'].hasMany(db['Ratings'], {
  foreignKey: 'userId',
  targetKey: 'id'
});
db['Offers'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  sourceKey: 'id'
});
db['Offers'].belongsTo(db['Contests'], {
  foreignKey: 'contestId',
  sourceKey: 'id'
});
db['Offers'].hasOne(db['Ratings'], {
  foreignKey: 'offerId',
  targetKey: 'id'
});
db['Ratings'].belongsTo(db['Users'], {
  foreignKey: 'userId',
  targetKey: 'id'
});
db['Ratings'].belongsTo(db['Offers'], {
  foreignKey: 'offerId',
  targetKey: 'id'
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;