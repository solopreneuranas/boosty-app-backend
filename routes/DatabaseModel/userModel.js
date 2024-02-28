var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    mobileno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("user", userSchema)