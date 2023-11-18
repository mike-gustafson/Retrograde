'use strict'

const { 
  Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {

  class PlatformLogo extends Model {

  }

  PlatformLogo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    alpha_channel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    animated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    checksum: {
      type: DataTypes.STRING(255),
    },
    height: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING(255),
    },
    width: {
      type: DataTypes.INTEGER,
    },
    image_id: {
      type: DataTypes.STRING(255),
    },}, {
      sequelize,
      modelName: 'PlatformLogo',
      tableName: 'platform_logos',
      timestamps: false, // Disable timestamps (createdAt and updatedAt)

    });

  return PlatformLogo;
};
