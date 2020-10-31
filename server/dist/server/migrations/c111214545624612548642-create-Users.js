'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'anon.png'
      },
      role: {
        type: Sequelize.ENUM('customer', 'creator'),
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    }).then(function () {
      return queryInterface.addConstraint('Users', ['balance'], {
        type: 'check',
        where: {
          balance: _defineProperty({}, Sequelize.Op.gte, 0)
        }
      });
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};