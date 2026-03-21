const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required : true
    },
    secondName: {
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

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel

