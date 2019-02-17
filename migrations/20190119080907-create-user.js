'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      u_name: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      u_no: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      u_pw: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      u_email: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};