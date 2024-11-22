const express = require("express");
const passport = require("passport");
const isAuthenticated = require("../middlewares/isAuthenticated");
// const isAuthenticated = require("../middlewares/isAuthenticated");
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
        return res.redirect('/');
    }
    res.json({ res: req.user })
})

// logout

authRoute.route('/logout').get((req, res, next) => {
    if (!req.isAuthenticated()) return
    req.logout((error) => {
        if (error) next(new ErrorHandler(error.status, error.message))
        res.redirect('/')
    })
})
authRoute.route('/getId').get(isAuthenticated)

module.exports = authRoute