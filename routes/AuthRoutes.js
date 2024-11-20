const express = require("express");
const passport = require("passport");
const authRoute = express.Router()


// google login
authRoute.route('/').get(passport.authenticate('google'));

// redirect after authenticate
authRoute.route('/callback').get(passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/auth/google/profile')
})

// get login user info
authRoute.route('/profile').get((req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/google');
    }
    res.json({ res: req.user })

})

module.exports = authRoute