require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
app.use(express.json());
const { Game, Platform, user } = require('./models');


const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const path = require('path');

SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(flash());            // flash middleware



app.use(session({
  secret: process.env.SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use('/platforms', require('./controllers/platforms'));
app.use('/games', require('./controllers/games'));


app.get('/', (req, res) => {
  res.render('index');
})

app.use('/auth', require('./controllers/auth'));

app.get('/profile', isLoggedIn, async (req, res) => {
  const { id, name, email } = req.user.get(); 
  const useracct = await user.findOne({
    where: { 
      id: req.user.id }
    });

  res.render('profile', { id, name, email, user: useracct});
  })

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Cartridge inserted in slot ${PORT}, insert coin to play!`);
});

module.exports = server;
