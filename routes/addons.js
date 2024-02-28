var express = require('express')
var router = express.Router()
var upload = require('./multer')
var Addons = require('./DatabaseModel/addonsModel')

router.post('/create-addons', function (req, res) {
    try {
        var addons = new Addons(req.body)
        console.log("BODY======>>>", req.body)
        addons.save().then((saveData) => {
            if (addons == saveData) {
                res.json({ status: true, message: 'Addons Services created successfully!' });
            }
            else {
                console.log(saveData)
                res.json({ status: false, message: 'Database Error!' });
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/display_all_addons_by_user', async function (req, res) {
    await Addons.find({ 'userid': req.body.userid }).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

module.exports = router;