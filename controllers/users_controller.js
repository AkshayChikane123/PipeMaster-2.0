const User = require('../models/user');
const EstimationInput = require('../models/estimationInput');

module.exports.profile = function (req, res) {
    // res.end('<h1>User Profile</h1>')

    return res.render('../views/user_profile.ejs', {
        title: "User Profile",
    });
};

// Render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "PipeMaster | Sign Up"
    });
};


// Render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_in', {
        title: "PipeMaster | Sign In"
    });
};

//Render the index.ejs page
module.exports.estimationPage = function (req, res) {
    return res.render('index')
}

// Get the sign-up data
module.exports.create = async function(req, res) {
    try {
        console.log("Request body:", req.body);  // Log request body

        if (req.body.password !== req.body.confirm_password) {
            req.flash('error','Confirm Password is not the same with password entered')

            // console.log("Passwords do not match");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            user = await User.create(req.body);
            req.flash('success','User Created Successfully')

            // console.log('User created successfully:', user);  // Log success
            return res.redirect('/users/sign-in');
        } else {
            req.flash('error','User Already Existed')
            // console.log('User already exists');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        // console.log('Error:', err);
        return res.redirect('back');
    }
};


//sign in and create session for the user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfuly')
    return res.redirect('/')
}


module.exports.destroySession = function (req, res, next) {
    
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    });
   

};



//Render the index.ejs file
module.exports.createEstimation = function (req, res) {
    
    if (!req.isAuthenticated()) {
        // req.flash('success', 'You started Estimation Process');
        return res.redirect('/users/sign-up');
       
    }


    return res.render('index', {
        
        title: "PipeMaster | estimation"
    });
   
}
module.exports.printEstimation = (req, res) => {
    res.render('demoquote', { 
        title: "Quotation",
        formData: req.session.formData // Retrieve form data from session if needed
    });
};

module.exports.saveEstimation = (req, res) => {
    req.session.formData = req.body;
    res.redirect('/users/demoquote');
};

// // New method to save estimation data
// module.exports.saveEstimation = async function(req, res) {
//     try {
//         console.log(req, "aaaaaaaaaaaaa");
//         const estimationData = req.body;
        
//         console.log('Estimation Data received:', estimationData); // Log the estimation data

//         // Add the user ID to the estimation data
//         estimationData.createdBy = req.user._id;

//         // Save the estimation data to the database
//         const newEstimation = new EstimationInput(estimationData);
//         await newEstimation.save();

//         req.flash('success', 'Estimation data saved successfully!');
//         return res.redirect('/users/estimation'); // Redirect to the estimation page or wherever you want
//     } catch (error) {
//         console.error('Error saving estimation data:', error);
//         req.flash('error', 'Error saving estimation data in database: ' + error.message);
//         return res.redirect('back');
//     }
// };