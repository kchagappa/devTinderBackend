const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string"
    },
    email: {
        type: "string"
    },
    password: {
        type: "string"
    },
    gender: {
        type: "string"
    },
    age: {
        type: "number"
    }
})

//Model methods
UserSchema.methods.getJWT = async function () {
    const userData = this
    const jwtTokens = await jwt.sign({ _id: userData._id }, "Chaga@123", { expiresIn: "1d" })
    return jwtTokens
}

UserSchema.methods.validatePassword = async function (passwordUserEnter) {
    const user = this
    const passworHash = user.password
    const isPasswordMatch = await bcrypt.compare(passwordUserEnter, passworHash)
    return isPasswordMatch
}
const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel

