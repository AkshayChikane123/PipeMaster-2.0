const User = require('../models/user');

module.exports.profile = function (req, res) {
    // res.end('<h1>User Profile</h1>')

    return res.render('../views/user_profile.ejs', {
        title: "User Profile"
    });
};

// Render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "PipeMaster | Sign Up"
    });
};


// Render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "PipeMaster | Sign In"
    });
};

// Get the sign-up data
module.exports.create = async function(req, res) {
    try {
        console.log("Request body:", req.body);  // Log request body

        if (req.body.password !== req.body.confirm_password) {
            console.log("Passwords do not match");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            user = await User.create(req.body);
            console.log('User created successfully:', user);  // Log success
            return res.redirect('/users/sign-in');
        } else {
            console.log('User already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error:', err);
        return res.redirect('back');
    }
};


//sign in and create session for the user
module.exports.createSession = function (req, res) {

    return res.redirect('/')
}