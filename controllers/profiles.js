'use strict'

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const getGamesOwned = require('../utils/get-user-games_owned.util');
const parsePlatformGamenameObjectIntoStrings = require('../utils/parse-platform-gamename-object into strings');

router.get('/', isLoggedIn, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id } });
    const { userGames, uniqueGames } = await getGamesOwned(user);
    const wishlist = await parsePlatformGamenameObjectIntoStrings(user.games_wishlist);

    res.render('profile/profile', { user, userGames, uniqueGames, req, wishlist });
})

router.get('/user', isLoggedIn, async (req, res) => {
    try {
        const { name, email, platforms_owner } = req.user;
        res.json({ name, email, platforms_owner });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/edit', isLoggedIn, async (req, res) => {
    try {
      const { name, email } = req.body;   
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (name !== '') { 
        user.name = name;
      }
        if (email !== '') {
            user.email = email;
        }
      await user.save();
      res.json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;