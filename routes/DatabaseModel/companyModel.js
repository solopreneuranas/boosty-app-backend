var mongoose = require('mongoose')
var companySchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    companystate: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    companytype: {
        type: String,
        required: true
    },
    companyindustry: {
        type: String,
        required: true
    },
    companydescp: {
        type: String,
        required: true
    },
    companywebsite: {
        type: String,
        required: false
    },
    userpassport: {
        type: String,
        required: false
    },
    memberfirstname: {
        type: String,
        required: true
    },
    memberlastname: {
        type: String,
        required: false
    },
    memberownership: {
        type: String,
        required: true
    },
    membersdata: {
        type: Array,
        required: false
    },    
    legalfirstname: {
        type: String,
        required: true
    },
    legallastname: {
        type: String,
        required: true
    },
    legalemail: {
        type: String,
        required: true
    },
    legalmobileno: {
        type: String,
        required: true
    },
    ein: {
        type: String,
        required: false
    },
    itin: {
        type: String,
        required: false
    },
    isitin: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    paymentid: {
        type: String,
        required: true
    },
    companystatus: {
        type: String,
        required: true
    },
    agentname: {
        type: String,
        required: false
    },
    agentaddress: {
        type: String,
        required: false
    },
    orderamount: {
        type: String,
        required: true
    },
    orderdate: {
        type: Date,
        required: true
    },
    addons: {
        type: Array,
        required: false
    },
    addonsorderdate: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model("company", companySchema)