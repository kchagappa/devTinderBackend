
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("Invalid Tokens")
        }
        const isValidTokesObj = await jwt.verify(token, "Chaga@123")
        const _id = isValidTokesObj._id
        const userData = await User.findById(_id)
        if (!userData) {
            throw new Error("user Not Found")
        }
        req.user = userData
        next()
    } catch (error) {
        res.send("Error: " + error)
    }
}

module.exports = {
    authUser
}