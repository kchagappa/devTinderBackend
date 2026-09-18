const express = require("express")
const { authUser } = require("../middlewares/authMiddlware")
const { validateEditFields } = require("../utils/validateUser")
const profileRouter = express.Router()

profileRouter.get("/profile/view", authUser, async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("User Not Found")
        }
        
        res.send(req.user)
    } catch (error) {
        res.status(400).send(`Error while Fetching : ${error.message}`)
    }
})

profileRouter.patch("/profile/edit", authUser, async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("User Not Found")
        }
        await validateEditFields(req)
        let logedInUser = req.user
        const fieldsToUpdate = Object.keys(req.body)
        fieldsToUpdate.forEach((field) => {
            logedInUser[field] = req.body[field]
        })
        await logedInUser.save()
        res.json({ message: "Profile updated successfully!!!",  "data": logedInUser }
        )
    } catch (error) {
        res.status(400).send(`Error while Fetching : ${error.message}`)
    }
})

module.exports = profileRouter
