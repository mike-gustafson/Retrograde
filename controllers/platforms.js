const express = require('express');
const router = express.Router();
const { Platform, PlatformLogo, Game, User } = require('../models');
const sortData = require('../utils/sort-data.util');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", async (req, res) => {
    try {  
      const platforms = await Platform.findAll({
            where: { category: [1, 5], },
          });
          const sortedPlatforms = sortData(platforms, 'alphaUp');
          const platformLogos = await PlatformLogo.findAll();
        
          res.render("platforms/index", { sortedPlatforms, platformLogos});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:platformId/games', async (req, res) => {
  try {
    const platformId = req.params.platformId;
    const loggedInUser = req.user;
    let platform = {};
    if (req.query.platformName) {
      platform.name = req.query.platformName;
    } else {
      platform = await Platform.findByPk(platformId);
    }
    const games = await Game.findAll({
      where: {
        platforms: [platformId,],
        category: 0,
      },
    });
    console.log(games);
    const sortedGames = sortData(games, 'alphaUp');

    res.render('games/_list', { user: loggedInUser, games: sortedGames, platform });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:platformId', isLoggedIn, async (req, res) => {
    try {
        const platformId = req.params.platformId;
        const platform = await Platform.findByPk(platformId);
        const user = await User.findOne({ where: { id: req.user.id } });

        const platformLogo = await PlatformLogo.findOne( {
          where: {
            id: platform.platformLogo,
          },
        });
        const games = await Game.findAll({
          where: {
            platforms: [platformId],
            category: 0,
          },
        });
        const sortedGames = sortData(games, 'alphaUp');
        res.render('platforms/details', { platform, platformLogo, games: sortedGames, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;