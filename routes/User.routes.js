const express = require("express");
const { updateProfilePicture } = require("../controllers/User.controller");
const upload = require("../utils/Multer");
const userRoute = express.Router()

userRoute.route("/changeProfilePicture").post(upload.single("profile_picture"), updateProfilePicture)

module.exports = userRoute