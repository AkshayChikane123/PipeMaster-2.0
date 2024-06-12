const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport 
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    async function (email, password, done) {
        try {
            // Find a user and establish the identity
            let user = await User.findOne({ email: email }).exec();
            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id).exec();
        if (!user) {
            return done(new Error('User not found'), null);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

module.exports = passport;




// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require('../models/user');


// //Authentication using passport 
// passport.use(
// 	new LocalStrategy(
// 		{
// 			usernameField: "email",
// 		},
//         function (email, password, done) {
//             //find a user and establish a identity
//             User.findOne({ email: email }, function (err, user) {
//                 if (err) {
//                     console.log('Error in finding user--> Passport');
//                     return done(err);
//                 }

//                 if (!user || user.password != password) {
//                     console.log('Invalid Username/Password');
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             });

//         }
// 	)
// );

// // Serializing the user to decide which key is to kept in the cookies
// passport.serializeUser(function (user, done) {
//     done(null, user.id);    
// })

// //deserializing the user from the key in the cookies
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         if (err) {
//             console.log('Error in finding user--> Passport');
             
//         }
//         return done(null, user);
//     })
// });

// module.exports = passport;