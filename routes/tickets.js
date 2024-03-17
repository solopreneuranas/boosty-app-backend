var express = require('express')
var router = express.Router()
var Ticket = require('./DatabaseModel/ticketsModel')

router.post('/create-tickets', function (req, res) {
    try {
        var ticket = new Ticket(req.body)
        ticket.save().then((saveData) => {
            if (ticket == saveData) {
                console.log("BODY===>>", saveData)
                res.json({ status: true, message: 'Ticket created successfully!' });
            }
            else {
                res.json({ status: false, message: 'Database Error!' });
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/display_all_tickets', async function (req, res) {
    await Ticket.find({}).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

router.post('/display_all_tickets_by_user', async function (req, res) {
    await Ticket.find({ 'userid': req.body.userid }).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

module.exports = router;