const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true, //unique means indexed or index:true, it will create an index for this field in the database
        trim: true,
        validate(value) { 
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) { 
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be at least 6 characters long")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq3f/image/upload/v1690911875/Default-Profile-Picture-1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_q6z8k9.png",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Image must be a valid URL")
            }
        }
    },
    gender: {
        type: String,
        enum : ["male", "female", "other"],
        message: `{VALUE} is incorrected gender type`,
        // validate(value) {
        //     if(!["male", "female", "other"].includes(value.toLowerCase())) {
        //         throw new Error("Invalid gender")
        //     }
        // }
    },
    age: {
        type: Number,
        min: 18,
        validate(value) {
            if(value < 18){
                throw new Error("Age must be at least 18")
            }
        }
    }, 
    skills: {
        type: Array,
    },
    about : {
        type: "string",
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
const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel

