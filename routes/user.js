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
                console.log("Hello")
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

router.post('/delete_user', async function (req, res) {
    await User.deleteOne({ _id: req.body._id }).then((result) => {
        res.json({ status: true })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
        console.log(e)
    })
})

const getEmailContent = (data) => {
    return (
        `Here is your OTP to confirm your email at Boosty App: ${data?.otp}`
    );
}

router.post('/verify-otp', function (req, res) {
    try {
        if (req.body) {
            const nodemailer = require("nodemailer");
            const transporter = nodemailer.createTransport({
                host: "smtpout.secureserver.net",
                port: 465,
                secure: true,
                auth: {
                    user: "hello@tryboosty.com",
                    pass: "@Boosty2024",
                },
            });
            async function main() {
                const info = await transporter.sendMail({
                    from: '"Boosty " <hello@tryboosty.com>', // sender address
                    to: `business@bluepreneurs.com, ${req.body?.email}`, // list of receivers
                    subject: "Verify Email for Boosty!", // Subject line
                    text: `Hello, ${req.body?.firstname} ${req?.body?.lastname}`, // plain text body
                    html: getEmailContent(req.body), // html body
                });
                console.log("Message sent: %s", info.messageId);
            }
            main().catch(console.error);
            res.json({ status: true, message: 'OTP sent successfully!' })
        }
        else {
            res.json({ status: false, message: 'Database Error!' });
        }
    }
    catch (e) {
        res.json({ status: false, message: 'Server Error!' })
    }
})

module.exports = router;