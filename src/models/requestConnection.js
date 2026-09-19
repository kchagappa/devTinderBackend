const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['ignored', 'accepted', 'rejected', 'interested'],
            default: 'pending',
            message: `{VALUE} is incorrected status type`
        }
    }, { timestamps: true });

//compond index to ensure uniqueness of senderId and receiverId combination 
connectionRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

// Pre-save middleware to check for self-requests
connectionRequestSchema.pre('save', async function () {
    const conectionRequest = this
    if (conectionRequest.senderId.toString() === conectionRequest.receiverId.toString()) {
        throw new Error('You cannot send a connection request to yourself.');
    }
});

const ConnectionRequest = mongoose.model(
    'ConnectionRequest',
    connectionRequestSchema
);

module.exports = ConnectionRequest;