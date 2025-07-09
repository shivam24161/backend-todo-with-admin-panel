const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    }
)
module.exports = mongoose.model("Todo", todoSchema);