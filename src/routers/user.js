const express = require("express")
const ConnectionRequest = require("../models/requestConnection")
const { authUser } = require("../middlewares/authMiddlware")

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName gender age imageUrl"

userRouter.get("/user/request/received", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user

        const users = await ConnectionRequest.find({
            receiverId: loggedInUser._id,
            status: "interested"
        }).populate("senderId", USER_SAFE_DATA)

        if (!users) {
            throw Error("No Request present")
        }
        res.json({
            message: "User Fetched successfully",
            data: users
        })
    } catch (error) {
        console.log("Error while fetching users", error)
        res.status(400).send(`Error : ${error.message}`)
    }
})

userRouter.get("/user/request/connection", authUser, async (req, res) => {

    try {
        const logedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { receiverId: logedInUser?._id, status: "accepted" },
                { senderId: logedInUser?._id, status: "accepted" }
            ]
        })
            .populate("senderId", USER_SAFE_DATA)
            .populate("receiverId", USER_SAFE_DATA)

        const finalResp = connectionRequest?.map((row) => {
            if (row.senderId?._id.toString() === logedInUser?._id?.toString()) {
                return row.receiverId
            }
            return row.senderId
        })

        res.json({
            message: "data fetched Succefully!!",
            data: finalResp
        })
    } catch (error) {
        return res.status(400).send("Error :" + error.message)
    }
})
module.exports = userRouter