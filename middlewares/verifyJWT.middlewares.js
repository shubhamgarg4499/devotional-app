const jwt = require('jsonwebtoken');
const user = require('../models/User.model');
const ErrorHandler = require('../utils/ErrorCLass')

const verifyToken = async (req, res, next) => {
    const token = req?.query?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new ErrorHandler(401, "Unauthorised Request: No token provided"))
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email) {
            const userData = await user.findOne({ email: decoded.email })
            if (!userData) {
                return next(new ErrorHandler(404, "User not found"));
            }
            if (userData.token != token) {
                return next(new ErrorHandler(401, `Unauthorised Request: Expired or Wrong Token`))
            }
            req.user = userData
            return next();
        }



        else if (decoded.phone_number) {
            const userData = await user.findOne({ phone_number: decoded.phone_number })
            if (!userData) {
                return next(new ErrorHandler(404, "User not found"));
            }
            if (userData.token != token) {
                return next(new ErrorHandler(401, `Unauthorised Request: Expired or Wrong Token`))
            }
            req.user = userData
            return next();
        }
        else {
            return next(new ErrorHandler(401, "Unauthorized Request: Invalid token payload"));
        }
    } catch (error) {
        return next(new ErrorHandler(401, "Unauthorised Request! Expired/Wrong Token"))
    }
}

module.exports = verifyToken