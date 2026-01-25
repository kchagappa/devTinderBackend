const express = require("express")
const connectDB = require("./config/database")
const UserModel = require("./models/user")
const app = express()


app.use(express.json())

app.post("/createUser", async (req, res) => {
    const user = UserModel(req?.body)

    try {
        await user.save()
        res.send("user added successfully!!!!!")

    } catch (error) {
        console.log("Error while adding the user")
        res.send(400)
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
