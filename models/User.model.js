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
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: String
    },
    profile_picture: {
        type: String,
        default: null,
    },
    phone_number: {
        type: String,
        unique: true
    },
    countryCode: {
        type: String,
    },
    about: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    signUpBy: {
        type: String,
        enum: ["Google", "PhoneNumber"],
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
    // OTP_Sent: {
    //     type: Date,
    //     default: Date.now
    // },

}, { timestamps: true })

const user = mongoose.model("user", userSchema)

module.exports = user