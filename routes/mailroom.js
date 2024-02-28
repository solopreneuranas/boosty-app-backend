var express = require('express')
var router = express.Router()
var upload = require('./multer')
var Mailroom = require('./DatabaseModel/mailroomModel')

const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

router.post('/create-mail', upload.single('mail'), function (req, res) {
    try {
        var body = { ...req.body, 'mail': req.file.filename }
        var mailroom = new Mailroom(body)
        console.log("BODY======>>>", req.body)
        mailroom.save().then((saveData) => {
            if (mailroom == saveData) {
                res.json({ status: true, message: 'Mail uploaded successfully!' });
            }
            else {
                console.log(saveData)
                res.json({ status: false, message: 'Database Error!' });
            }
        })
    }
    catch (e) {
        console.log("ERROR", e)
        res.json({ status: false, message: 'Server Error!' })
    }
})

router.post('/display_all_mails_by_user', async function (req, res) {
    await Mailroom.aggregate([
        {
            $lookup: {
                from: "companies",
                localField: "companyid",
                foreignField: "_id",
                as: "companyData"
            }
        },
        {
            $match: {
                userid: new mongoose.Types.ObjectId(req.body.userid)
            }
        }
    ],
        { $unwind: "$companyData" }
    ).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ msg: "Error", error: e })
    })
})

router.post('/delete-mail', async function (req, res) {
    await Mailroom.deleteOne({ _id: req.body._id }).then((result) => {
        res.json({ status: true })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
        console.log(e)
    })
})

module.exports = router;