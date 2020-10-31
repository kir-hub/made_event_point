'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Banks', {
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiry: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cvc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      }
    }).then(function () {
      return queryInterface.addConstraint('Banks', ['balance'], {
        type: 'check',
        where: {
          balance: _defineProperty({}, Sequelize.Op.gte, 0)
        }
      });
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Banks');
  }
};