const { Platform, Game } = require('../models');

async function getGamesOwned(useracct) {
    let userGames = [];
    let uniqueGames = 0;

    if (useracct.games_owned_was_updated) {
        if (useracct.games_owned) {
            const platformIds = Object.keys(useracct.games_owned);

            await Promise.all(platformIds.map(async (platformId) => {
                const games = useracct.games_owned[platformId];
                const platform = await Platform.findByPk(platformId);

                const gameCounts = games.reduce((acc, gameId) => {
                    acc[gameId] = (acc[gameId] || 0) + 1;
                    return acc;
                }, {});

                await Promise.all(Object.keys(gameCounts).map(async (gameId) => {
                    const game = await Game.findByPk(gameId);
                    const gameCount = gameCounts[gameId];

                    if (gameCount === 1) {
                        userGames.push({ platform: platform.name, game: game.name, id: gameId, platformId: platform.id});
                        uniqueGames++;
                    } else {
                        const gameNameWithCount = `(${gameCount}) ${game.name}`;
                        userGames.push({ platform: platform.name, game: gameNameWithCount, id: gameId, platformId: platform.id});
                        uniqueGames++;
                    }
                }));
            }));
            useracct.unique_games_owned = uniqueGames;  
            useracct.games_owned_prev = userGames;
            useracct.games_owned_was_updated = false;
            useracct.changed('games_owned_prev', true)
            await useracct.save();
        }
    } else {
        userGames = useracct.games_owned_prev;
        uniqueGames = useracct.unique_games_owned;
    }
    return { userGames, uniqueGames };
}

module.exports = getGamesOwned;
