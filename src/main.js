const express = require("express")
const connectDB = require("./config/database")
const UserModel = require("./models/user")
const app = express()


app.post("/createUser", async (req, res) => {
    const user = UserModel({
        firstName: "chagappa",
        secondName: "kurubara",
        age: "26",
        gender: "male",
        email: "chaga@gmail.com",
        password: "chaga@123"
    })

    await user.save()

    res.send("user added successfully!!!!!")

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
