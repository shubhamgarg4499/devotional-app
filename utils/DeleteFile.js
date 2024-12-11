const fs = require("fs")
const ErrorHandler = require("./ErrorCLass")

function deleteFile(url) {
    fs.unlink(url, (error) => {
        if (error) {
            throw new ErrorHandler(error.status, error.message)
        }
        return true
    })
}

module.exports = deleteFile