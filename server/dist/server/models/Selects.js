'use strict';

module.exports = function (sequelize, DataTypes) {
  var SelectBox = sequelize.define('Selects', {
    type: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    describe: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
  return SelectBox;
};