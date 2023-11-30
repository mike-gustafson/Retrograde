'use strict'

const express = require('express');
const router = express.Router();
const { Game, Platform, User } = require('../models');
const sortData = require('../utils/sort-data.util');

// IGDB.com API headers
const headers = {
  'Accept': process.env.HEADER_ACCEPT,
  'Client-ID': process.env.HEADER_CLIENT_ID,
  'Authorization': process.env.HEADER_AUTHORIZATION,
  'Content-Type': process.env.HEADER_CONTENT_TYPE,
};

// GET /games - fetch all games on consoles and handhelds
router.get("/", async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const platforms = await Platform.findAll({
      attributes: ['id'],
      where: { category: [1, 5], },
    })
    const platformIds = platforms.map((platform) => platform.id);
    const games = await Game.findAll({
      where: { platforms: { [Op.overlap]: platformIds, } },
    });
    res.render("games/index", { games });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /games/byId/:gameId - fetch a single game by ID
router.get('/byId/:gameId', async (req, res) => {
  const gameRaw = `fields *; \r\nwhere id = ${req.params.gameId};`;
  try {
    const gameData = await fetch("https://api.igdb.com/v4/games", {
      method: 'post',
      headers: headers,
      body: gameRaw,
    });
    const game = await gameData.json();

    const coverRaw = `fields *; \r\nwhere id = ${game[0].cover};`;
    const cover = await fetch("https://api.igdb.com/v4/covers", {
      method: 'post',
      headers: headers,
      body: coverRaw,
    });
    if (!cover.ok) {
      throw new Error(`HTTP error! Status: ${cover.status}`);
    }
    const coverData = await cover.json();
    res.render('games/details', { game: game[0], cover: coverData[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /games/add-to-collection/:gameId - fetch a single game by ID and add it to the user's collection
router.post('/add-to-collection', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  try {
    let user = await User.findOne({ where: { id: userId } });
    if (!user.games_owned) { 
      user.games_owned = {}; }
    if (!user.games_owned[platformId]) { 
      user.games_owned[platformId] = [gameId]; 
    } else { 
      user.games_owned[platformId].push(gameId); 
    }
    user.games_owned_was_updated = true;
    user.changed('games_owned', true); // !IMPORTANT! required to get an object to update in PSQL 
    await user.save();
    return res.status(200).json({ message: `Game ${gameId} added to collection` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /games/remove-from-collection - fetch a single game by ID and remove it from the user's collection
router.post('/remove-from-collection', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  console.log(req.body.userId, 'userId', req.body.gameId, 'gameId', req.body.platformId, 'platformId');
  try {
    let user = await User.findOne({ where: { id: userId } });
    if (user.games_owned && user.games_owned[platformId]) {
      const gameIndex = user.games_owned[platformId].indexOf(gameId);
      if (gameIndex !== -1) {
        user.games_owned[platformId].splice(gameIndex, 1); // Remove one copy
        if (user.games_owned[platformId].length === 0) {
          delete user.games_owned[platformId];
        }
        user.games_owned_was_updated = true;
        user.changed('games_owned', true);
        await user.save();
        return res.status(200).json({ message: `One copy of game ${gameId} removed from collection` });
      } else {
        return res.status(404).json({ error: 'Game not found in user collection' });
      }
    } else {
      return res.status(404).json({ error: 'Game not found in user collection' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add-to-wishlist', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  try {
    let user = await User.findOne({ where: { id: userId } });
    if (!user.games_wishlist) { 
      user.games_wishlist = {}; }
    if (!user.games_wishlist[platformId]) { 
      user.games_wishlist[platformId] = [gameId]; 
    } else { 
      user.games_wishlist[platformId].push(gameId); 
    }
    user.games_wishlist_was_updated = true;
    user.changed('games_wishlist', true); // !IMPORTANT! required to get an object to update in PSQL
    await user.save();
    return res.status(200).json({ message: `Game ${gameId} added to wishlist` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/remove-from-wishlist', async (req, res) => {
  const { userId, gameId, platformId } = req.body;
  try {
    let user = await User.findOne({ where: { id: userId } });
    if (user.games_wishlist && user.games_wishlist[platformId]) {
      const gameIndex = user.games_wishlist[platformId].indexOf(gameId);
      if (gameIndex !== -1) {
        user.games_wishlist[platformId].splice(gameIndex, 1); // Remove one copy
        if (user.games_wishlist[platformId].length === 0) {
          delete user.games_wishlist[platformId];
        }
        user.games_wishlist_was_updated = true;
        user.changed('games_wishlist', true);
        await user.save();
        return res.status(200).json({ message: `One copy of game ${gameId} removed from wishlist` });
      } else {
        return res.status(404).json({ error: 'Game not found in user wishlist' });
      }
    } else {
      return res.status(404).json({ error: 'Game not found in user wishlist' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;