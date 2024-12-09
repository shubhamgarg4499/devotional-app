const user = require("../models/User.model")
const ErrorHandler = require("../utils/ErrorCLass")
const jwt = require('jsonwebtoken');
require("dotenv").config();
// login and signup with mobile number

const loginWithNumber = async (req, res, next) => {
    const { country_code, phone_number } = req.body;
    // Validate input
    if (!country_code) {
        return next(new ErrorHandler(404, "Please Select your Country Code"));
    } else if (!phone_number) {
        return next(new ErrorHandler(404, "Please Enter your Phone Number"));
    }

    try {
        // Find if the user already exists based on phone number and country code
        const findUser = await user.findOne({ phone_number: phone_number, countryCode: country_code });

        // If user exists, generate token and return user data
        if (findUser) {
            // Create JWT token 
            const token = await jwt.sign(
                { _id: findUser._id, phone_number: findUser.phone_number },
                process.env.JWT_SECRET, // JWT secret
                { expiresIn: '10d' } // Token expiry 
            );
            findUser.token = token
            await findUser.save({ validateBeforeSave: false })
            return res.send({
                success: true,
                user: { ...findUser.toObject() },
                token
            });
        }
        // If user doesn't exist, create a new user
        const createUser = await user.create({
            phone_number: phone_number,
            countryCode: country_code,
            signUpBy: "PhoneNumber",
            token: "null"
        });

        // Create JWT token for new user
        const token = await jwt.sign(
            { _id: createUser._id, phone_number: createUser.phone_number },
            process.env.JWT_SECRET, // Your JWT secret
            { expiresIn: '10d' } // Token expiry (optional)
        );
        createUser.token = token
        await createUser.save({ validateBeforeSave: false })
        // Send response with the created user's data and the token
        res.send({
            success: true,
            user: { ...createUser.toObject() },
            token
        });

    } catch (error) {
        return next(new ErrorHandler(error.status, error.message));
    }
};

// get a user detail
// const getUser = async (req, res, next) => {
//     try {
//         const { email, phone_number } = req.body
//         if (!email && !phone_number) {
//             return next(new ErrorHandler(404, "Email/Phone Number Not Found"))
//         }
//         const query = {};
//         if (email) query.email = email;
//         if (phone_number) query.phone_number = phone_number;


//         const Finduser = await user.findOne(query)

//         if (!Finduser) {
//             return next(new ErrorHandler(404, "User not found"));
//         }

//         // Return found user
//         res.status(200).json({ success: true, user: Finduser });
//     } catch (error) {
//         return next(new ErrorHandler(error.status, error?.message))
//     }
// }





// updation of name, gender, dob, about
const changeUserDetails = async (req, res, next) => {
    try {
        const allowedFields = ["name", "gender", "dob", "about"];
        // Validate that only allowed fields are present
        for (const key in req.body) {
            if (!allowedFields.includes(key)) {
                return next(new ErrorHandler(400, "You can provide only name, gender, dob, about fields"));
            }
        }
        const _id = String(req?.user._id)
        const findUser = await user.findById(_id)

        if (!findUser) next(new ErrorHandler(401, "Unauthorised Request"))

        // if (!name && !gender && !dob && !about) {
        //     return next(new ErrorHandler(404, "Give the field which you want to update"))
        // }
        // Check if any valid fields are provided to update
        const updateFields = Object.keys(req.body);
        if (updateFields.length === 0) {
            return next(new ErrorHandler(400, "No valid fields provided to update"));
        }

        const update = await user.findByIdAndUpdate(_id, { ...req.body }, { new: true })
        res.status(200).json({ success: true, user: { ...update.toObject() } })
    } catch (error) {
        return new ErrorHandler(error.status, error.message)
    }
}

// updateProfilePicture
const updateProfilePicture = async (req, res, next) => {
    try {
        const { _id } = req.user
        const profile_picture = req?.file
        // res.send(profile_picture)
        if (!_id) next(new ErrorHandler(404, "User ID Not Found"))

        if (!profile_picture) {
            return next(new ErrorHandler(400, "Please Upload a Profile Picture"))
        }

        const findUser = await user.findByIdAndUpdate(_id, { profile_picture: profile_picture.path }, { new: true })
        res.status(200).json({ success: true, user: { ...findUser.toObject() } })
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

        if (findUser.signUpBy == "Google") {
            return next(new ErrorHandler(400, "You cant change Email of this Account Because this account was created with Email"))
        }
        const updateUser = await user.findByIdAndUpdate(_id, { email }, { new: true })
        res.status(200).json({ success: true, user: { ...updateUser.toObject() } })
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
        res.status(200).json({ success: true, user: { ...updateUser.toObject() } })
    } catch (error) {
        return next(new ErrorHandler(error.status, error.message))
    }
}

module.exports = { changeUserDetails, updateProfilePicture, loginWithNumber, changeUserEmail, changeUserPhoneNumber }