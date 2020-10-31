'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Selects', {
      type: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Selects');
  }
};