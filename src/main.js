const express = require("express")
const connectDB = require("./config/database")
const bcrypt = require("bcrypt")
const UserModel = require("./models/user")
const ValidateSignUpUser = require("./utils/validateUser")
const validator = require("validator");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { authUser } = require("./middlewares/authMiddlware.js")
const app = express()

app.use(express.json())
app.use(cookieParser())

//signIn
app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender } = req.body
        await ValidateSignUpUser(req)
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
            age,
            gender
        })
        await user.save()
        res.send("user added successfully!!!!")
    } catch (error) {
        console.log("Error while adding the user")
        res.status(400).send(error.message)
    }
})

//logIn
app.post("/logIn", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email!!!")
        }
        const userData = await UserModel.findOne({ email })
        const isPasswordMatch = await userData.validatePassword(password)
        if (!isPasswordMatch) {
            throw new Error("Invalid login credentials!!!")
        } else {
            const token = await userData.getJWT()
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600) })
            res.send("LogIn successfull!!!")
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

//GET single user
app.get("/profile", authUser, async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("User Not Found")
        }
        res.send(req.user)
    } catch (error) {
        res.status(400).send(`Error while Fetching : ${error.message}`)
    }
})


connectDB()
    .then(() => {
        console.log("data base connection established!!!!")
        app.listen(8080, async () => {

            console.log("server running on 8080 portal")
        })
    })
    .catch(error => {
        console.log("Data base is not connected!!!!")
    })
