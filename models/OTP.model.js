
var mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
        default: "+91"
    },
    expiresIn: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000)
    }
})

const otp = mongoose.model("otp", otpSchema)

module.exports = otp