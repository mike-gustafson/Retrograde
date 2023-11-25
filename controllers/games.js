'use strict'

const express = require('express');
const router = express.Router();
const { Game, Platform, User } = require('../models');

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


router.get('/byId/:gameId', async (req, res) => {
  const gameId = req.params.gameId;

  const rawQuery = `fields *; \r\nwhere id = ${gameId};`;

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'mtos002sejiyk8rra7wr9i0cjeq4fk',
        'Authorization': 'Bearer k54046h0mmd74wexbb3r2kmr6aatah',
        'Content-Type': 'text/plain',
      },
      body: rawQuery,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const game = await response.json();
    console.log(game, 'that was game');
    console.log(game[0].cover, 'that was game[0].cover')

    // const delay = ms => new Promise(res => setTimeout(res, ms));
    // await delay(5000);
    
    const coverRaw = `fields *; \r\nwhere id = ${game[0].cover};`;
    console.log(coverRaw, 'that was coverRaw');
    const cover = await fetch("https://api.igdb.com/v4/covers", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'mtos002sejiyk8rra7wr9i0cjeq4fk',
        'Authorization': 'Bearer k54046h0mmd74wexbb3r2kmr6aatah',
        'Content-Type': 'text/plain',
      },
      body: coverRaw,
    });

    if (!cover.ok) {
      throw new Error(`HTTP error! Status: ${cover.status}`);
    }

    const coverData = await cover.json();
    console.log(coverData, 'that was cover');

    res.render('games/details', { game: game[0], cover: coverData[0] });
  } catch (error) {
    console.error(error);
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
      res.render("games/index", { games, platform });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.post('/add-to-collection', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  try {
    let useracct = await User.findOne({where: { id: userId }});
        
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
    return res.status(200).json({ success: true, message: 'Game added to collection' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;