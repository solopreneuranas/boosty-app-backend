var mongoose = require('mongoose')
var ticketsSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    ticketdate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("ticket", ticketsSchema)