const express = require("express");
const ErrorMiddleware = require("./middlewares/Error.middleware");
const app = express()
const cookieParser = require('cookie-parser')
require("dotenv").config()
app.use(express.json())
const cors = require('cors');
app.use(cors())
app.use(cookieParser())

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
    // if (req.isAuthenticated()) {
    //     res.send(`<a href="/">Logout</a>`)
    // } else {

    // }
    res.send(`<a href="/auth/google">Login</a>`)

})
const authRoute = require("./routes/Auth.Routes");
const isAuthenticated = require("./middlewares/isAuthenticated");
app.use("/auth/google", authRoute)


// userRoutes
const userRoute = require('./routes/User.routes')

app.use('/user', userRoute)


// routes ends



// error handle with middleware
app.use(ErrorMiddleware)



const port = process.env.PORT || 4040
app.listen(port, () => {
    console.log("Server Started at port " + port);
})