function ErrorMiddleware(error, req, res, next) {
    let Error = error?.message || "Something Went Wrong"
    let status = error.status || 400
    res.status(status).json({ Error })
}

module.exports = ErrorMiddleware