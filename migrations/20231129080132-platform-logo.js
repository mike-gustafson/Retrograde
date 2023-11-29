'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('platform_logos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      alpha_channel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      animated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      checksum: {
        type: Sequelize.STRING(255),
      },
      height: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING(255),
      },
      width: {
        type: Sequelize.INTEGER,
      },
      image_id: {
        type: Sequelize.STRING(255),
      },
    });

    // Add any associations or additional constraints here
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can drop the 'platform_logos' table
    await queryInterface.dropTable('platform_logos');
  },
};

