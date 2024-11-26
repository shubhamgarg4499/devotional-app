const express = require("express");
const { updateProfilePicture, loginWithNumber, changeUserDetails, changeUserEmail, changeUserPhoneNumber } = require("../controllers/User.controller");
const verifyToken = require("../middlewares/verifyJWT.middlewares");
const user = require("../models/User.model");
const ErrorHandler = require("../utils/ErrorCLass");
const upload = require("../utils/Multer");
const userRoute = express.Router()

// userRoute.route("/getUserDetails").post(verifyToken, getUser)
userRoute.route("/login/Number").post(loginWithNumber)
userRoute.route("/changeUserDetails").post(verifyToken, changeUserDetails)
userRoute.route("/changeUserEmail").post(verifyToken, changeUserEmail)
userRoute.route("/changeUserPhoneNumber").post(verifyToken, changeUserPhoneNumber)
userRoute.route("/changeProfilePicture").post(verifyToken, upload.single("profile_picture"), updateProfilePicture)

// logout
userRoute.route('/logout').get(verifyToken, async (req, res, next) => {
    try {
        const { _id } = req?.user
        const Finduser = await user.findById(_id)
        Finduser.token = null
        await Finduser.save({ validateBeforeSave: false })
        res.status(200).json({ message: "User Logged Out!", success: true })
    } catch (error) {
        return next(new ErrorHandler(error.status, error.message))
    }
})

// /get user profile info
userRoute.route(`/profile`).get(verifyToken, (req, res) => {
    res.status(200).json({ user: req.user })
})
module.exports = userRoute