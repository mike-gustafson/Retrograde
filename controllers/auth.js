const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

// import models
const { User } = require('../models');

router.get("/signup", (req, res) => {
  return res.render("auth/signup");
});

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get('/logout', (req, res) => {
  req.logOut(function(err, next) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logging out... See you next time!');
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '../',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const [_user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, password }
    });

    if (created) {
        const successObject = {
            successRedirect: '/',
            successFlash: `Welcome ${_user.name}. Account was created and logging in...`
        }
        passport.authenticate('local', successObject)(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
    }
  } catch (error) {
        console.log('**************Error');
        console.log(error);
        req.flash('error', 'Either email or password is incorrect. Please try again.');
        res.redirect('/auth/signup');
  }
});

module.exports = router;