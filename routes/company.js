var express = require('express')
var router = express.Router()
var upload = require('./multer')
var Company = require('./DatabaseModel/companyModel')

const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

const getEmailContent = (data) => {
    return (
        `Hello ${data?.useraccountname}, 
        We have received your order of company formation in ${data?.companystate}.
        Soon your company ${data?.companyname} will be formed in ${data?.companystate}.`
    );
}


router.post('/create-company', upload.single('userpassport'), function (req, res) {
    try {
        var body = { ...req.body, 'userpassport': req.file.filename }
        var company = new Company(body)
        console.log("Company details: ", req.body)
        company.save().then((saveData) => {
            if (company == saveData) {

                const nodemailer = require("nodemailer");

                const transporter = nodemailer.createTransport({
                    host: "smtp.hostinger.com",
                    port: 465,
                    secure: true, // Use `true` for port 465, `false` for all other ports
                    auth: {
                        user: "hello@bluenexus.co",
                        pass: "@Nexus2024",
                    },
                });

                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                        from: '"Anas K. " <hello@bluenexus.co>', // sender address
                        to: `${req.body?.useraccountemail}`, // list of receivers
                        subject: "Hello Anas ✔", // Subject line
                        text: "Hello, this is a Test email?", // plain text body
                        html: getEmailContent(req.body), // html body
                    });
                    console.log("Message sent: %s", info.messageId);
                }

                main().catch(console.error);

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

router.post('/delete_company', async function (req, res) {
    await Company.deleteOne({ _id: req.body._id }).then((result) => {
        res.json({ status: true })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
        console.log(e)
    })
})

module.exports = router;