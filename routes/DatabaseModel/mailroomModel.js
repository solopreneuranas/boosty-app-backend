var mongoose = require('mongoose')
var mailroomSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "companies",
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    mailtype: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        required: true
    },
    maildate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("mailroom", mailroomSchema)