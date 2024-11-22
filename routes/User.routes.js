const express = require("express");
const { updateProfilePicture, loginWithNumber, getUser, changeUserDetails, changeUserEmail, changeUserPhoneNumber } = require("../controllers/User.controller");
const upload = require("../utils/Multer");
const userRoute = express.Router()

userRoute.route("/login/Number").post(loginWithNumber)
userRoute.route("/getUserDetails").post(getUser)
userRoute.route("/changeUserDetails").post(changeUserDetails)
userRoute.route("/changeUserEmail").post(changeUserEmail)
userRoute.route("/changeUserPhoneNumber").post(changeUserPhoneNumber)
userRoute.route("/changeProfilePicture").post(upload.single("profile_picture"), updateProfilePicture)

module.exports = userRoute