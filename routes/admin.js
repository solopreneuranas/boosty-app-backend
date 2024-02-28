var express = require('express')
var router = express.Router()
var Admin = require('./DatabaseModel/adminModel')

router.post('/login', async function (req, res) {
    await Admin.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).then((result) => {
        if (result.length == 1) {
            console.log(result)
            res.json({ status: true, data: result })
        }
        else {
            res.json({ status: false })
        }
    })
})

module.exports = router;