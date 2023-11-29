'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('platforms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      abbreviation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alternativeName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'alternative_name',
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      generation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      platformLogo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'platform_logo',
      },
      platformFamily: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'platform_family',
      },
    });

    // Add any associations or additional constraints here
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can drop the 'platforms' table
    await queryInterface.dropTable('platforms');
  },
};
