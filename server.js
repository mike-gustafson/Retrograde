require('dotenv').config();

const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const axios = require('axios');

const app = express();
const path = require('path');
const passport = require('./config/ppConfig');
const { Game, Platform, PlatformLogo, User } = require('./models');

app.use(layouts);
app.use(flash());
app.use(express.json());
app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use('/quotes', require('./controllers/random-quotes'));
app.use('/platforms', require('./controllers/platforms'));
app.use('/profile', require('./controllers/profiles'));
app.use('/games', require('./controllers/games'));
app.use('/auth', require('./controllers/auth'));

app.get('/', async (req, res) => {
 const platforms = await Platform.findAll();
  res.render('homepage', { platforms });
})
//-------------------------------------------------------------------------------------------------

function sanitizeTitle(title) {
  if (title) {
    return title.replace(/[^\x00-\x7F]/g, ''); // This regex removes non-ASCII characters
  } else {
    title = 'unknown';
    return title
  }
}

async function fetchAndUpdateGames(offset) {
  try {
    let data = `fields *;limit 500; offset ${offset};sort id asc;`;
console.log('Fetched '+offset+' games   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      data,
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'mtos002sejiyk8rra7wr9i0cjeq4fk',
          'Authorization': 'Bearer k54046h0mmd74wexbb3r2kmr6aatah',
        },
      }
    );

    const gamesData = response.data;

    // If data is empty, stop the recursion
    if (gamesData.length === 0) {
      console.log('No more data to fetch.');
      return;
    }
// Apply sanitizeTitle function to each game name
const sanitizedGamesData = gamesData.map(game => ({
  ...game,
  name: sanitizeTitle(game.name),
  summary: sanitizeTitle(game.summary),
  slug: sanitizeTitle(game.slug),
  version_title: sanitizeTitle(game.version_title),
}));
    // Update the database with the fetched data
    await Game.bulkCreate(sanitizedGamesData);


// Call the function recursively with the next offset after a 5-second pause
setTimeout(async () => {

  await fetchAndUpdateGames(offset + 500);
}, 5000);
  } catch (error) {
    console.error('Error fetching and updating data:', error);
  }
}

// Endpoint to initiate the data fetching and updating process
app.get('/updateGames', async (req, res) => {
  try {
    // Start the process with offset 0
    await fetchAndUpdateGames(0);

    res.status(200).json({ message: 'Data update complete.' });
  } catch (error) {
    console.error('Error updating games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//------------------------ end update game data
//------------------------ update platform logos
async function fetchAndUpdatePlatformLogos() {
  try {
    let data = `fields *;limit 500;sort id asc;`;

    const response = await axios.post(
      'https://api.igdb.com/v4/platform_logos',
      data,
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'mtos002sejiyk8rra7wr9i0cjeq4fk',
          'Authorization': 'Bearer k54046h0mmd74wexbb3r2kmr6aatah',
        },
      }
    );

    const platformLogosData = response.data;

    // If data is empty, stop the process
    if (platformLogosData.length === 0) {
      console.log('No more platform logos to fetch.');
      return;
    }

    // Apply sanitizeTitle function to each platform logo's url
    const sanitizedPlatformLogosData = platformLogosData.map(platformLogo => ({
      ...platformLogo,
      url: sanitizeTitle(platformLogo.url),
    }));

    // Update the database with the fetched data
    await PlatformLogo.bulkCreate(sanitizedPlatformLogosData);

    // Call the function recursively after a 5-second pause
    setTimeout(async () => {
      await fetchAndUpdatePlatformLogos();
    }, 5000);
  } catch (error) {
    console.error('Error fetching and updating platform logos:', error);
  }
}

app.get('/updatePlatforms', async (req, res) => {
  try {
    // Fetch platforms from the API
    const response = await axios.post(
      'https://api.igdb.com/v4/platforms',
      'fields *; limit 500; sort id asc;',
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'mtos002sejiyk8rra7wr9i0cjeq4fk',
          'Authorization': 'Bearer k54046h0mmd74wexbb3r2kmr6aatah',
        },
      }
    );

    const platformsData = response.data;

    // If data is empty, stop the process
    if (platformsData.length === 0) {
      console.log('No more platforms to fetch.');
      return res.status(200).json({ message: 'No more platforms to fetch.' });
    }

    // Update the database with the fetched platform data
    await Platform.bulkCreate(platformsData);

    res.status(200).json({ message: 'Platform update complete.' });
  } catch (error) {
    console.error('Error updating platforms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//---------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Cartridge inserted in slot ${PORT}, insert coin to play!`);
});

module.exports = server;