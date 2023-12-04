const express = require('express');
const router = express.Router();
const { Platform, PlatformLogo, Game, User } = require('../models');
const sortData = require('../utils/sort-data.util');
const isLoggedIn = require('../middleware/isLoggedIn');
const { Op } = require('sequelize');


async function generatePlatformHTML(platform, platformLogos) {
    try {
      const platformLogos2 = await PlatformLogo.findAll();
      const platformLogoId = platform.platformLogo;
      const foundLogo = platformLogos2.find(logo => logo.id === platformLogoId);
      let logoUrl = '';
      if (foundLogo) {
        logoUrl = foundLogo.url.replace('jpg', 'png').replace('t_thumb', 't_720p');
      } else {
        console.warn('Platform Logo not found for ID:', platformLogoId);
      }
      return `
    <div class="col mb-1">
      <div class="p-1 h-100">
        <section class="text-white p-1" style="min-height: 60px;">
          <div class="d-flex align-items-center">
            ${logoUrl ? `
              <img src="http:${logoUrl}" alt="${platform.name} Logo" class="img-fluid platform-logo"
                style="max-width: 75px; max-height: 50px;">
            ` : ''}
            <a href="/platforms/${platform.id}">
              <h6 class="card-title ms-2 text-center">
                ${platform.name}
              </h6>
            </a>
          </div>
        </section>
      </div>
    </div>
  `;
    } catch (error) {
      console.error('Error fetching and logging platform logos:', error);
    }
    
  
}


router.get("/", async (req, res) => {
    try {  
      const platformsPromise = await Platform.findAll({
            where: { category: [1, 5], },
          });
      const platformLogosPromise = await PlatformLogo.findAll();
      
      const [platforms, platformLogos] = await Promise.all([platformsPromise, platformLogosPromise]);
      console.log(platforms, 'platforms')
      const sortedPlatforms = sortData(platforms, 'alphaUp');
      const platformHTMLPromises = sortedPlatforms.map(platform => generatePlatformHTML(platform, platformLogos));
      const platformHTMLArray = await Promise.all(platformHTMLPromises);
      const platformHTML = platformHTMLArray.join('');
      res.render("platforms/index", { platformHTML});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:platformId/games', async (req, res) => {
  try {
    const platformId = req.params.platformId;
    const loggedInUser = req.user;
    let platform = {};
    if (req.query.platformName) {
      platform.name = req.query.platformName;
    } else {
      platform = await Platform.findByPk(platformId);
    }
    const games = await Game.findAll({
      where: {
        platforms: [platformId],
        category: 0,
      },
    });
    console.log(games);
    const sortedGames = sortData(games, 'alphaUp');

    res.render('games/_list', { user: loggedInUser, games: sortedGames, platform });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:platformId', isLoggedIn, async (req, res) => {
    try {
        const platformId = req.params.platformId;
        const platform = await Platform.findByPk(platformId);
        const user = await User.findOne({ where: { id: req.user.id } });

        const platformLogo = await PlatformLogo.findOne( {
          where: {
            id: platform.platformLogo,
          },
        });
        const games = await Game.findAll({
          where: {
            platforms: {
              [Op.contains]: [platformId],
            },            
            category: [0, 10, 11, 3, 8, 13, 2, 1, 4] ,
          },
        });
        const sortedGames = sortData(games, 'alphaUp');
        res.render('platforms/details', { platform, platformLogo, games: sortedGames, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;