const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

// Encrypt each cookie and send on authentication function call
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Take incoming request, decrypt cookie, find user in database,
// Add user to 'req' object as req.user for every single request
passport.deserializeUser((id, done) => {
  console.log('deserializing', id);

  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      User.findOne({ facebookId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ facebookId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
