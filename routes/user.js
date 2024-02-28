var express = require('express')
var router = express.Router()
var User = require('./DatabaseModel/userModel')

router.post('/create-account', function (req, res) {
    try {
        var user = new User(req.body)
        user.save().then((saveData) => {
            if (user == saveData) {
                res.json({ status: true, message: 'User account created successfully!' });
            }
            else {
                 console.log ("Hello")
                res.json({ status: false, message: 'Database Error!' });
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/login', async function (req, res) {
    await User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).then((result) => {
        if (result.length == 1) {
            res.json({ status: true, data: result })
        }
        else {
            res.json({ status: false })
        }
    })
})

router.post('/update-account', async function (req, res, next) {
    var { _id, ...data } = req.body
    await User.updateOne({ _id: req.body._id }, data).then((result) => {
        res.json({ status: true, message: 'User updated!' })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
    })
})

router.get('/display_all_users', async function (req, res) {
    await User.find({}).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})


module.exports = router;