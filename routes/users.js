const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/estimation", passport.checkAuthentication, usersController.createEstimation);

router.post("/create", usersController.create);

//Use passport as middleware to authenticate
// router.post('/create-session', {failureRedirect:'/users/sign-in'}, usersController.createSession)
router.post(
	"/create-session",
	passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
	usersController.createSession
);

router.get('/sign-out', usersController.destroySession);



// New route for demoquote.html
router.get("/html/demoquote.html", (req, res) => {
    res.render('demoquote.ejs', {
        title: "Demo Quote"
    });
});

module.exports = router;
