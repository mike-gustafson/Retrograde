const { Platform, Game } = require('../models');

async function parsePlatformGamenameObjectIntoStrings(data) {
    // will take an object where {platformId: [gameId, gameId, gameId]} and return a 2d array where each element is [platformName, gameName]
    const platformAndGameNames = [];
    // first we will break down the object into an array of arrays where each element is [platformId, gameId]
    const platformAndGameIds = Object.entries(data);
    // then we will iterate through each element and get the platform and game names
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
    // finally we will return the array of arrays where each element is [platformName, gameName]
    return platformAndGameNames;
}

module.exports = parsePlatformGamenameObjectIntoStrings;