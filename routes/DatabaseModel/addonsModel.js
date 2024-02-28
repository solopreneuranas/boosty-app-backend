var mongoose = require('mongoose')
var addonsSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "companies",
        required: true
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "companies",
        required: true
    },
    paymentid: {
        type: String,
        required: true
    },
    addonsstatus: {
        type: String,
        required: true
    },
    orderamount: {
        type: String,
        required: true
    },
    orderdate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("addons", addonsSchema)