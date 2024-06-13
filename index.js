const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session);
const MongoDBStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));


//to access Post Request
app.use(express.urlencoded({ extended:true}));

//to use cookie-parser package for managing cookies
app.use(cookieParser());

//to access static files
app.use(express.static('./assets')); 

// to use express layouts to use functionality it's css and js 
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up the view engine ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// // mongo store is used to store the session cookie in the db
// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: 1000 * 60 * 100,
//     },
//     store: new MongoStore(
//         {
//             mongooseConnection: mongoose.connection,
//             autoRemove: 'disabled'
        
//         },
//         function(err){
//             console.log(err ||  'connect-mongodb setup ok');
//         }
//     )
// }));

// Session store setup with connect-mongodb-session
const store = new MongoDBStore({
    uri: 'mongodb://localhost/PipeMaster_development',
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log('Session Store Error:', error);
});

// Express-session setup
app.use(session({
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 100 // Adjusted for session expiration
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router and setting up path
app.use('/', require('./routes'));


// for error logging to check if server is running or not
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);

});
