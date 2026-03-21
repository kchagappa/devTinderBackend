const express = require("express")
const connectDB = require("./config/database")
const UserModel = require("./models/user")
const app = express()


app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = UserModel(req?.body)
    try {
        await user.save()
        res.send("user added successfully!!!!!")

    } catch (error) {
        console.log("Error while adding the user")
        res.status(400).send("user not found")
    }
})

//GET single user
app.get("/getUser", async (req, res) => {

    try {
        const userDetails = req.query
        const response = await UserModel.findOne(userDetails)
        if (!response) {
            res.status(400).send("User Not found")
        }
        res.send(response)
    } catch (error) {
        console.log("Somthing went wrong")
    }
})

//GET all the users 
app.get("/feed", async (req, res) => {

    try {
        const response = await UserModel.find({})
        if (response.length === 0) {
            res.status(400).send("User Not found")
        }
        res.send(response)
    } catch (error) {
        console.log("Somthing went wrong")
    }
})

//delete  user
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId
        const deleteResult = await UserModel?.findOneAndDelete({ _id: userId })
        if (deleteResult.length === 0) {
            res.status(400).send("User Not found")
        }
        res.send(deleteResult)
    } catch (error) {
        console.log("Somthing went wrong")
    }

})

//update  user
app.patch("/user", async (req, res) => {
    try {
        const userId = req.body.userId
        const updateResult = await UserModel?.findByIdAndUpdate({ _id: userId }, {firstName : "chagapppaa"})
        console.log(updateResult)
        if (updateResult.length === 0) {
            res.status(400).send("User Not found")
        }
        console.log(updateResult)
        res.send(updateResult)
    } catch (error) {
        console.log("Somthing went wrong")
    }

    //thirdParameter is for returning the updated document if right Before it will return the old document before update, if we pass Afrer it will return the updated document
    // const deleteResult = await UserModel?.findByIdAndUpdate({ _id: userId }, {firstName : "kurubara"}, { returnDocument : "after" })
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
