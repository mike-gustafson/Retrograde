'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ageRatings: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'age_ratings',
      },
      aggregatedRating: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'aggregated_rating',
      },
      aggregatedRatingCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'aggregated_rating_count',
      },
      alternativeNames: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'alternative_names',
      },
      artworks: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      bundles: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      checksum: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      collection: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      collections: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      cover: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: 'created_at',
      },
      dlcs: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      expandedGames: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'expanded_games',
      },
      expansions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      externalGames: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'external_games',
      },
      firstReleaseDate: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: 'first_release_date',
      },
      follows: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      forks: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      franchise: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      franchises: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      gameEngines: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'game_engines',
      },
      gameLocalizations: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'game_localizations',
      },
      gameModes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'game_modes',
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      hypes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      involvedCompanies: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'involved_companies',
      },
      keywords: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      languageSupports: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'language_supports',
      },
      multiplayerModes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'multiplayer_modes',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      parentGame: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'parent_game',
      },
      platforms: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      playerPerspectives: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'player_perspectives',
      },
      ports: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      ratingCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'rating_count',
      },
      releaseDates: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'release_dates',
      },
      remakes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      remasters: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      screenshots: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      similarGames: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'similar_games',
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      standaloneExpansions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
        field: 'standalone_expansions',
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      storyline: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      themes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      totalRating: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'total_rating',
      },
      totalRatingCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'total_rating_count',
      },
      updatedAt: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: 'updated_at',
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      versionParent: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'version_parent',
      },
      versionTitle: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'version_title',
      },
      videos: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      websites: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
    });

    // Add any associations or additional constraints here
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can drop the 'games' table
  }
};