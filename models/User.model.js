const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "User"
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
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
        unique: true,
        sparse: true,
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

userSchema.pre("validate", function (next) {
    if (!this.email && !this.phone_number) {
        return next(new Error("Either email or phone number must be provided."));
    }
    next();
});
const user = mongoose.model("user", userSchema)

module.exports = user






// const apis = [
//     {
//         name: "google authentication",
//         url: "https://devotional-app.onrender.com/auth/google",
//     },
//     {
//         name: "get user details",
//         url: "https://devotional-app.onrender.com/user/profile",
//         required: ["token"]
//     },
//     {
//         name: "Logout user",
//         url: "https://devotional-app.onrender.com/user/logout",
//         required: ["token"]
//     },
//     {
//         name: "Login with number",
//         url: "https://devotional-app.onrender.com/user/login/Number",
//         required: ["country_code", "phone_number"]
//     },
//     {
//         name: "Change user basic details",
//         url: "https://devotional-app.onrender.com/user/changeUserDetails",
//         required: ["token", "name(optional)", "about(optional)", "dob(optional)", "gender(optional)"]
//     },
//     {
//         name: "Change user email",
//         url: "https://devotional-app.onrender.com/user/changeUserEmail",
//         required: ["token", "email(required)"]
//     },
//     {
//         name: "Change user phone number",
//         url: "https://devotional-app.onrender.com/user/changeUserPhoneNumber",
//         required: ["token", "phone_number(required)", "country_code(required)"]
//     },
//     {
//         name: "Change user profile picture",
//         url: "https://devotional-app.onrender.com/user/changeProfilePicture",
//         required: ["token", "profile_picture(required)"]
//     },


// ]


