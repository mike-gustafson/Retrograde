const { Platform } = require('./models');

const fetchPlatformsMiddleware = async (req, res, next) => {
  try {
    const platforms = await Platform.findAll();
    res.locals.platforms = platforms;
    next();
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { fetchPlatformsMiddleware };