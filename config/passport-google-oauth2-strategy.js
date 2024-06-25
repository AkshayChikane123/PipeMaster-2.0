// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth');
// const crypto = require('crypto');
// const User = require('../models/user');

// // tell passport to use a new strategy for google login
// passport.use(new googleStrategy, ({
//     clientID: "144309908050-9hpaq2p43dpr3s1avehn1f2upit5tq96.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:8000/users/auth/google/callback",

// },
//     function (accessToken, refreshToken, profile, done) {
//         //find a user
//         User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
//             if (err) { console.log('error in google strategy-passport', err); return; }
//             console.log(profile);

//             if (user) {
//                 //if found  set this user as req.user
//                 return done(null, user);
//             } else {

//                 // if not found create the user and set it as req.user
//                 User.create({
//                     name: profile,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 }, function (err, user) {
//                     if (err) { console.log('error in creating user', err); return; }
//                     return done(null, user);
                    
//                 })
//             }
//         })
//     }
    
// ));

// module.exports = passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for Google login
passport.use(new GoogleStrategy({
    clientID: "144309908050-9hpaq2p43dpr3s1avehn1f2upit5tq96.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find a user
      let user = await User.findOne({ email: profile.emails[0].value }).exec();
      
      if (user) {
          // If found, set this user as req.user
          console.log(accessToken, refreshToken);
          console.log(profile);
        return done(null, user);
      } else {
        // If not found, create the user and set it as req.user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        });
        return done(null, user);
      }
    } catch (err) {
      console.log('error in google strategy-passport', err);
      return done(err);
    }
  }
));

module.exports = passport;
