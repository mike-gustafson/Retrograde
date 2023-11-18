'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'games_followed', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'games_owned', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'games_wishlist', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'games_ratings', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'platforms_owned', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'platforms_wishlist', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'platforms_followed', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'platforms_ranked', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
  await queryInterface.removeColumn('users', 'games_followed');
  await queryInterface.removeColumn('users', 'games_owned');
  await queryInterface.removeColumn('users', 'games_wishlist');
  await queryInterface.removeColumn('users', 'games_ratings');
  await queryInterface.removeColumn('users', 'platforms_owned');
  await queryInterface.removeColumn('users', 'platforms_wishlist');
  await queryInterface.removeColumn('users', 'platforms_followed');
  await queryInterface.removeColumn('users', 'platforms_ranked');

  }  
};
