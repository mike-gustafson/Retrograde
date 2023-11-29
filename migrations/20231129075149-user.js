'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [1, 99],
            msg: 'Name must be between 1 and 99 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [8, 99],
            msg: 'Password must be between 8 and 99 characters',
          },
        },
      },
      games_followed: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      games_owned: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      games_owned_prev: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      unique_games_owned: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      games_owned_was_updated: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      games_wishlist: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      games_wishlist_was_updated: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      games_ratings: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      platforms_ranked: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      platforms_followed: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      platforms_owned: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      platforms_wishlist: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Add any associations or additional constraints here
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can drop the 'users' table
    await queryInterface.dropTable('users');
  },
};
