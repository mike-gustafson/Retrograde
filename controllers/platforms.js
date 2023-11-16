const express = require('express');
const router = express.Router();
const { Platform } = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const session = require('express-session');
router.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));
const flash = require('connect-flash');
router.use(flash());            // flash middleware

router.get("/", isLoggedIn, async (req, res) => {
    try {
        const platforms = await Platform.findAll({
            where: {
              category: [1, 5],
            },
          });
          res.render("hardware/platforms", { platforms });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;