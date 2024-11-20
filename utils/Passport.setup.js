const passport = require("passport");
const user = require("../models/User.model");
const ErrorHandler = require("./ErrorCLass");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
function passportHandler() {

    passport.use(new GoogleStrategy(
        {
            clientID: process.env.id, clientSecret: process.env.secret,
            callbackURL: "/auth/google/callback",
            scope: ['profile', 'email']
        }, async function (accessToken, refreshToken, profile, done) {
            try {
                const findedUser = await user.findOne({ email: profile._json.email })
                if (findedUser) {
                    done(null, findedUser)
                }
                else {
                    const newUser = await user.create({
                        name: profile?.displayName, email: profile?._json.email, profile_picture: profile?._json?.picture
                    })

                    done(null, newUser)
                }
            } catch (error) {
                done(new ErrorHandler(error.status, error.message))
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user?._id)
    })

    passport.deserializeUser(async (_id, done) => {
        try {
            const findUser = await user.findById(_id)
            done(null, findUser)
        } catch (error) {
            done(new ErrorHandler(error.status, error.message));
        }

    })
}

module.exports = passportHandler