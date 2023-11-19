'use strict'

const express = require('express');
const router = express.Router();
const { Game, Platform, user } = require('../models');

router.get("/", async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const platforms = await Platform.findAll({
      attributes: ['id'],
      where: {
        category: [1, 5],
      },
      })
      const platformIds = platforms.map((platform) => platform.id);
      console.log('id list: ',platformIds);
    const games = await Game.findAll({
      where: {
        platforms: {
        [Op.overlap]: platformIds,
      }
      },
    });
    // Render the "hardware/games" view with the fetched data
    res.render("games/index", { games: games});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:platformId', async (req, res) => {
  try {
    const platformId = req.params.platformId;

    let platform = {};
    if (req.query.platformName) {
      platform.name = req.query.platformName;
    } else {
      platform = await Platform.findByPk(platformId);
    }

    const games = await Game.findAll({
      where: {
        platforms: [platformId]
      },
    });
    // Render the "hardware/games" view with the fetched data
    res.render("games/index", { games, platform });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add-to-collection', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  try {
    let useracct = await user.findOne({where: { id: userId }});
        
    if (!useracct.games_owned) {
      useracct.games_owned = {};
    }
    if (!useracct.games_owned[platformId]) {
      useracct.games_owned[platformId] = [gameId];
    } else {
      useracct.games_owned[platformId].push(gameId);
    }
    useracct.changed('games_owned', true)
    await useracct.save();
    console.log(useracct.name,'owns',useracct.games_owned)
    return res.status(200).json({ success: true, message: 'Game added to collection' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
