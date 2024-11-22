const ErrorHandler = require("../utils/ErrorCLass")

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log(req?.user?._id);
        next()
        // res.send(req?.user?._id)
    }
    return
    // res.send("not")
}
module.exports = isAuthenticated