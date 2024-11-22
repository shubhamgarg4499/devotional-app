const user = require("../models/User.model")
const ErrorHandler = require("../utils/ErrorCLass")


// login and signup with mobile number
const loginWithNumber = async (req, res, next) => {
    // middleware to check last otp sent time(3 min)
    // number and country code
    // generate otp
    // save otp and expire date in model(like 3 min)
    const { country_code, phone_number } = req

    if (!country_code) {
        return next(new ErrorHandler(404, "Please Select your Country Code"))
    } else if (!phone_number) {
        return next(new ErrorHandler(404, "Please Enter your Phone Number"))
    }
    const findUser = await user.find({ phone_number: phone_number.toString(), countryCode: country_code.toString() })

    if (!findUser) {
        const createUser = await user.create({
            phone_number: phone_number.toString(), countryCode: country_code.toString(), signUpBy: "PhoneNumber"
        })
        res.send({ success: true, user: { ...createUser } })
    }
    res.send({ success: true, user: { ...createUser } })
}

// get a user detail
const getUser = async (req, res, next) => {
    try {
        const { email, phone_number } = req.body
        if (!email && !phone_number) {
            return next(new ErrorHandler(404, "Email/Phone Number Not Found"))
        }
        const query = {};
        if (email) query.email = email;
        if (phone_number) query.phone_number = phone_number;


        const Finduser = await user.findOne(query)

        if (!Finduser) {
            return next(new ErrorHandler(404, "User not found"));
        }

        // Return found user
        res.status(200).json({ success: true, user: Finduser });
    } catch (error) {
        return next(new ErrorHandler(error.status, error?.message))
    }
}

// updation of name, gender, dob, about
const changeUserDetails = async (req, res, next) => {
    try {
        const { _id } = req?.user
        const findUser = await user.findById(_id)
        if (!findUser) next(new ErrorHandler(402, "Unauthorised Request"))
        const { name, gender, dob, about } = req.body
        if (!name && !gender && !dob && !about) {
            return next(new ErrorHandler(404, "Give the field which you want to update"))
        }
        const query = {}
        ["name", "gender", "dob", "about"].forEach(e => {
            if (req.body[e]) {
                query[e] = req.body[e]
            }
        })

        if (Object.keys(query).length === 0) {
            return next(new ErrorHandler(400, "No valid fields to update"));
        }
        const update = await user.findByIdAndUpdate(_id, { query }, { new: true })
        res.status(200).json({ success: true, updatedUser: { ...update } })
    } catch (error) {
        return new ErrorHandler(error.status, error.message)
    }
}

// updateProfilePicture
const updateProfilePicture = async (req, res, next) => {
    try {
        const { _id } = req.user
        const profile_picture = req?.file
        if (!id) next(new ErrorHandler(404, "User ID Not Found"))

        if (!profile_picture) {
            return next(new ErrorHandler(400, "Please Upload a Profile Picture"))
        }

        const findUser = await user.findByIdAndUpdate(_id, { profile_picture }, { new: true })
        res.status(200).json({ success: true, user: { ...findUser } })
    } catch (error) {
        return next(new ErrorHandler(400, "Error occured while updating Profile Picture! Please Try Again"))
    }

}

// user email update only when user created account with mobile number
const changeUserEmail = async (req, res, next) => {
    try {
        const { _id } = req?.user
        const findUser = await user.findById(_id)
        const { email } = req?.body

        if (!findUser) next(new ErrorHandler(404, "User Not Found"))
        if (!email) next(new ErrorHandler(404, "Give your Updated gmail"))
        if (findUser.signUpBy == "Email") {
            return next(new ErrorHandler(400, "You cant change Email of this Account Because this account was created with Email"))
        }
        const updateUser = await user.findByIdAndUpdate(_id, { email }, { new: true })
        res.status(200).json({ success: true, user: { ...updateUser } })
    } catch (error) {
        return next(new ErrorHandler(error.status, error.message))
    }
}
// user phone number update only when user created account with gmail
const changeUserPhoneNumber = async (req, res, next) => {
    try {
        const { _id } = req?.user
        const findUser = await user.findById(_id)
        const { phone_number, countryCode } = req?.body

        if (!findUser) next(new ErrorHandler(404, "User Not Found"))
        if (!phone_number || countryCode) next(new ErrorHandler(404, "Required Country Code & Phone Number!!"))
        if (findUser.signUpBy == "PhoneNumber") {
            return next(new ErrorHandler(400, "You cant change Phone Number of this Account Because this account was created with Phone Number"))
        }
        const updateUser = await user.findByIdAndUpdate(_id, { phone_number, countryCode }, { new: true })
        res.status(200).json({ success: true, user: { ...updateUser } })
    } catch (error) {
        return next(new ErrorHandler(error.status, error.message))
    }
}

module.exports = { getUser, changeUserDetails, updateProfilePicture, loginWithNumber, changeUserEmail, changeUserPhoneNumber }