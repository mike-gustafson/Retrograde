const express = require('express');
const router = express.Router();
const { Platform, PlatformLogo, Game } = require('../models');

router.get("/", async (req, res) => {
    try {
        const platforms = await Platform.findAll({
            where: {
              category: [1, 5],
            },
          });
          platforms.sort((a, b)=> {
            if (!a.name && !b.name) return 0;
            if (!a.name) return 1;
            if (!b.name) return -1;
            return a.name.localeCompare(b.name);
            });
          const platformLogos = await PlatformLogo.findAll();
          res.render("platforms/index", { platforms, platformLogos});
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
      },
    });
    res.render('games/_list', { user: loggedInUser, games, platform });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;