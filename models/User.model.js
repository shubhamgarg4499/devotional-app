const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "User"
    },
    email: {
        unique: true,
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,
        trim: true
    },
    profile_picture: {
        type: String,
        default: null,
    },
    phone_number: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    OTP_Sent: {
        type: Date,
        default: Date.now
    }
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // }

}, { timestamps: true })

const user = mongoose.model("user", userSchema)

module.exports = user