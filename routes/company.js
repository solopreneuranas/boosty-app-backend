var express = require('express')
var router = express.Router()
var upload = require('./multer')
var Company = require('./DatabaseModel/companyModel')

const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

router.post('/create-company', upload.single('userpassport'), function (req, res) {
    try {
        var body = { ...req.body, 'userpassport': req.file.filename }
        var company = new Company(body)
        console.log("BODY======>>>", req.body)
        company.save().then((saveData) => {
            if (company == saveData) {
                res.json({ status: true, message: 'Company created successfully!' });
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

router.post('/display_all_companies_by_user', async function (req, res) {
    await Company.find({ 'userid': req.body.userid }).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

router.post('/display_user_details_by_company', async function (req, res) {
    await Company.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $match: {
                userid: new mongoose.Types.ObjectId(req.body.userid)
            }
        }
    ],
        { $unwind: "$userData" }
    ).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ msg: "Error", error: e })
    })
})

router.get('/display_all_companies', async function (req, res) {
    await Company.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $lookup: {
                from: "orderstatuses",
                localField: "userid",
                foreignField: "userid",
                as: "orderStatus"
            }
        }
    ],
        { $unwind: "$userData", $unwind: "$orderStatus" }
    ).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ msg: "Error", error: e })
    })
})

router.post('/update-company', async function (req, res, next) {
    var { _id, ...data } = req.body
    await Company.updateOne({ _id: req.body._id }, data).then((result) => {
        console.log("BODY==>>", req.body)
        res.json({ status: true, message: 'Company updated!' })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
    })
})

module.exports = router;