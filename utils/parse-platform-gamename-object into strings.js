const { Platform, Game } = require('../models');

async function parsePlatformGamenameObjectIntoStrings(data) {
    const platformAndGameNames = [];
    if (!data) return platformAndGameNames;
    const platformAndGameIds = Object.entries(data);
    for (let i = 0; i < platformAndGameIds.length; i++) {
        const platformId = platformAndGameIds[i][0];
        const gameIds = platformAndGameIds[i][1];
        const platform = await Platform.findByPk(platformId);
        for (let j = 0; j < gameIds.length; j++) {
            const gameId = gameIds[j];
            const game = await Game.findByPk(gameId);
            platformAndGameNames.push([platform.name, game.name]);
        }
    }
    console.log(platformAndGameNames)
    return platformAndGameNames;
}

module.exports = parsePlatformGamenameObjectIntoStrings;