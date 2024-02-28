var express = require('express')
var router = express.Router()
var upload = require('./multer')
var Document = require('./DatabaseModel/documentsModel')

const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

router.post('/create-document', upload.single('documents'), function (req, res) {
    try {
        var body = { ...req.body, 'documents': req.file.filename }
        var document = new Document(body)
        console.log("BODY======>>>", req.body)
        document.save().then((saveData) => {
            if (document == saveData) {
                res.json({ status: true, message: 'Document uploaded successfully!' });
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

router.post('/display_all_documents_by_user', async function (req, res) {
    await Document.find({ 'userid': req.body.userid }).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

// router.post('/display_all_documents_by_company', async function (req, res) {
//     await Document.aggregate([
//         {
//             $lookup: {
//                 from: "companies",
//                 localField: "companyid",
//                 foreignField: "_id",
//                 as: "companyData"
//             }
//         },
//         {
//             $match: {
//                 companyid: new mongoose.Types.ObjectId(req.body.companyid)
//             }
//         }
//     ],
//         { $unwind: "$companyData" }
//     ).then((result) => {
//         res.json({ status: true, data: result })
//     }).catch((e) => {
//         res.json({ msg: "Error", error: e })
//     })
// })

router.post('/delete-document', async function (req, res) {
    await Document.deleteOne({ _id: req.body._id }).then((result) => {
        res.json({ status: true })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
        console.log(e)
    })
})

module.exports = router;