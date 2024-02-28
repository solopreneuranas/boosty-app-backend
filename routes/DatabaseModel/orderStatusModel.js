var mongoose = require('mongoose')
var orderStatusSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    agent: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    formation: {
        type: String,
        required: true
    },
    ein: {
        type: String,
        required: true
    },
    boi: {
        type: String,
        required: true
    },
    agreement: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("orderstatus", orderStatusSchema)