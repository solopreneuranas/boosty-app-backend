var mongoose = require('mongoose')
var documentsSchema = mongoose.Schema({
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "companies",
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    documents: {
        type: String,
        required: true
    },
    docdate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("document", documentsSchema)