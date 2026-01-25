const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    firstName: {
        type: "string"
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

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel

