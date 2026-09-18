const express = require("express")
const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator");
const { ValidateSignUpUser } = require("../utils/validateUser");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender, skills, about , photoUrl} = req?.body
        await ValidateSignUpUser(req)
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
            age,
            gender,
            skills,
            about,
            photoUrl
        })
        await user.save()
        res.send("user added successfully!!!!")
    } catch (error) {
        console.log("Error while adding the user", error)
        res.status(400).send(error.message)
    }
})

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(Date.now())})
        res.send("Logout successfull!!!")
    } catch (error) {
        res.status(400).send(error.message)
    }


})

module.exports = authRouter