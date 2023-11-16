'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  ageRatings: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'age_ratings',
  },
  aggregatedRating: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    field: 'aggregated_rating',
  },
  aggregatedRatingCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'aggregated_rating_count',
  },
  alternativeNames: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'alternative_names',
  },
  artworks: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  bundles: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  checksum: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  collection: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  collections: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  cover: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'created_at',
  },
  dlcs: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  expandedGames: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'expanded_games',
  },
  expansions: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  externalGames: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'external_games',
  },
  firstReleaseDate: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'first_release_date',
  },
  follows: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  forks: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  franchise: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  franchises: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  gameEngines: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'game_engines',
  },
  gameLocalizations: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'game_localizations',
  },
  gameModes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'game_modes',
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  hypes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  involvedCompanies: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'involved_companies',
  },
  keywords: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  languageSupports: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'language_supports',
  },
  multiplayerModes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'multiplayer_modes',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  parentGame: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'parent_game',
  },
  platforms: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  playerPerspectives: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'player_perspectives',
  },
  ports: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'rating_count',
  },
  releaseDates: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'release_dates',
  },
  remakes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  remasters: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  screenshots: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  similarGames: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'similar_games',
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  standaloneExpansions: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    field: 'standalone_expansions',
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  storyline: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  themes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  totalRating: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    field: 'total_rating',
  },
  totalRatingCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'total_rating_count',
  },
  updatedAt: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'updated_at',
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  versionParent: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'version_parent',
  },
  versionTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'version_title',
  },
  videos: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  websites: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Game',
  tableName: 'games', // Define the actual table name in the database
  timestamps: false, // Disable timestamps (createdAt and updatedAt)
});

return Game;
};
