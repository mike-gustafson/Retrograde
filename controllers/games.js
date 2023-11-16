const express = require('express');
const router = express.Router();
const { Game } = require('../models');
const passport = require('../config/ppConfig');

router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll({
      where: {
        platforms: [18],
      },
    });

    // Render the "hardware/games" view with the fetched data
    res.render("hardware/games", { games: games });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
