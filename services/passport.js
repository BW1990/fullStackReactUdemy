// passportJs
const passport = require('passport');

// passport strategy Google OAuth 2.0
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

// get keys
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
});

// console.developers.google.com
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // already have record with given profile ID
        return done(null, existingUser);
      }
      // don't have user record with this ID, make new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
