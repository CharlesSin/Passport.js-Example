var express = require('express');
var router = express.Router();

const passport = require('../config/facebook');
const passportGoogle = require('../config/google')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', function (req, res, next) {
  // console.log(req.user);
  res.render('success', { data: req.user });
})

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/'
  })
);

/* GOOGLE ROUTER */
router.get('/auth/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/'
  })
);

module.exports = router;