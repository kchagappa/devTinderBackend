const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routers/auth")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")
const mongoose = require("mongoose")
const userRouter = require("./routers/user")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/", userRouter)



connectDB()
    .then(() => {
        console.log("data base connection established!!!!")
        app.listen(8080, async () => {

            console.log("server running on 8080 portal")
        })
        mongoose.model('User').syncIndexes(); 
    })
    .catch(error => {
        console.log("Data base is not connected!!!!", error)
    })
