const express = require("express");
const ErrorMiddleware = require("./middlewares/Error.middleware");
const app = express()
require("dotenv").config()
app.use(express.json())


// database connecion starts
const connectDB = require("./utils/ConnectDB");
const ErrorHandler = require("./utils/ErrorCLass");
connectDB()
// database connecion ends



// routes starts
app.get("/", (req, res, next) => {
    res.send("hii")
})
const authRoute = require("./routes/AuthRoutes");
app.use("/auth/api/v1", authRoute)
// routes ends



// error handle with middleware
app.use(ErrorMiddleware)



const port = process.env.PORT || 4040
app.listen(port, () => {
    console.log("http://localhost:" + port);
})