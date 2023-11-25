const express = require('express');
const router = express.Router();
const { Platform, User, Game } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, async (req, res) => {
    const { id, name, email } = req.user.get();
    const useracct = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    const userGames = [];
    let uniqueGames = 0;
    for (const platformId in useracct.games_owned) {
        const games = useracct.games_owned[platformId];
        const platform = await Platform.findByPk(platformId);
        const gameCounts = games.reduce((acc, gameId) => {
            acc[gameId] = (acc[gameId] || 0) + 1;
            return acc;
        }, {});
        for (const gameId in gameCounts) {
            const game = await Game.findByPk(gameId);
            if (gameCounts[gameId] === 1) {
                const gameNameWithCount = game.name;
                userGames.push({ platform: platform.name, game: gameNameWithCount });
                uniqueGames++;
            } else {
                const gameNameWithCount = `(${gameCounts[gameId]}) ${game.name}`;
                userGames.push({ platform: platform.name, game: gameNameWithCount });
                uniqueGames++;
            }
        }
        
    }
    console.log(userGames);
    res.render('profile/profile', { id, name, email, user: useracct, userGames, uniqueGames });
})

module.exports = router;