class ErrorHandler extends Error {
    constructor(status = 404, message = "Something went wrong") {
        super(message)
        this.status = status
    }
}

module.exports = ErrorHandler