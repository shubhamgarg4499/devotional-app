const ErrorHandler = require("../utils/ErrorCLass")

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log(req?.user?._id);
        // res.send(req?.user?._id)
        next()
    }
    return
    // res.send("not")
}
module.exports = isAuthenticated


// const isauth = (req, res, next) => {
//     const { token } = req.cookies

//     if (!token) {
//         return next(new ErrorHandler(400, "unauthorised request"))
//     }

//     const
// } 