'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Platform.init({
    abbreviation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    alternativeName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'alternative_name',
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    generation: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platformLogo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'platform_logo',
    },
    platformFamily: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'platform_family',
    },
  }, {
    sequelize,
    modelName: 'Platform',
    tableName: 'platforms', // Define the actual table name in the database
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
  });


  return Platform;
};
