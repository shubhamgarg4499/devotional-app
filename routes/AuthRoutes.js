const express = require("express")
const authRoute = express.Router()

authRoute.route("/").get((req, res) => {
    res.send("hii")
})

module.exports = authRoute