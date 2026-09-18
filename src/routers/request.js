const express = require("express")
const { authUser } = require("../middlewares/authMiddlware")
const ConnectionRequest = require("../models/requestConnection")
const UserModel = require("../models/user")
const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:userId", authUser, async (req, res) => {
    try {
        const user = req.user
        const fromUserId = user?._id
        const toUserId = req.params.userId
        const status = req.params.status

        // const isSelfRequest = fromUserId.toString() === toUserId.toString()
        // Check if the user is trying to send a connection request to themselves
        // if (isSelfRequest) {
        //     throw new Error("You cannot send a connection request to yourself!!!")
        // }

        // Check if the receiver user exists
        const toUser = await UserModel.findById(toUserId)
        if (!toUser) {
            throw new Error("Receiver user not found!!!")
        }

        // Validate the status parameter
        const allowedStatus = ['ignored', 'interested']
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type!!!")
        }

        // Check if a connection request already exists between the two users
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { senderId: fromUserId, receiverId: toUserId },
                { senderId: toUserId, receiverId: fromUserId }
            ]
        })

        if (existingRequest) {
            throw new Error("Connection request already sent!!!")
        }

        const connectionRequest = new ConnectionRequest({
            senderId: fromUserId,
            receiverId: toUserId,
            status: status
        })

        await connectionRequest.save()

        res.json({
            message: `${user.firstName} ${user.lastName} has ${status === 'interested' ? 'shown interest in' : 'ignored'} ${toUser.firstName} ${toUser.lastName}`,
            data: connectionRequest
        })
    }
    catch (error) {
        console.log("Error while sending connection request", error)
        res.status(400).send(`Error while sending connection request: ${error.message}`)
    }
})


module.exports = requestRouter