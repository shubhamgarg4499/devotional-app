const express = require("express");
const ErrorMiddleware = require("./middlewares/Error.middleware");
const app = express()
require("dotenv").config()
app.use(express.json())
const cors = require('cors');
app.use(cors())


// database connecion starts
const connectDB = require("./utils/ConnectDB");
const ErrorHandler = require("./utils/ErrorCLass");
connectDB()
// database connecion ends

// session
const session = require("express-session")
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

// passport setup starts
const passport = require("passport");
const passportHandler = require("./utils/Passport.setup");
app.use(passport.initialize())
app.use(passport.session())
passportHandler()
// passport setup ends

// routes starts
app.get("/", (req, res, next) => {
    res.send(`<a href="/auth/google">Login</a>`)
})
const authRoute = require("./routes/AuthRoutes");
app.use("/auth/google", authRoute)
// routes ends



// error handle with middleware
app.use(ErrorMiddleware)



const port = process.env.PORT || 4040
app.listen(port, () => {
    console.log("Server Started at port " + port);
})