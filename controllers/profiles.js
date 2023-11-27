'use strict'

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const getGamesOwned = require('../utils/get-user-games_owned.util');

router.get('/', isLoggedIn, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id } });
    const { userGames, uniqueGames } = await getGamesOwned(user);
    res.render('profile/profile', { user, userGames, uniqueGames, req });
})

router.get('/user/:userId/platform/:platformId/game/:gameId/copies-owned-count', isLoggedIn, async (req, res) => {
    try {
      const { userId, platformId, gameId } = req.params;

      const count = 5;
      res.json({ count });
    } catch (error) {
      console.error('Error fetching copies-owned count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

router.get('/user', isLoggedIn, async (req, res) => {
    try {
        const { name, email, platforms_owner } = req.user;
        res.json({ name, email, platforms_owner });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;