var express = require('express')
var router = express.Router()
var upload = require('./multer')
var OrderStatus = require('./DatabaseModel/orderStatusModel')

router.post('/create-order-status', function (req, res) {
    try {
        var orderStatus = new OrderStatus(req.body)
        orderStatus.save().then((saveData) => {
            if (orderStatus == saveData) {
                res.json({ status: true, message: 'Order statsu created successfully!' });
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

router.post('/display_order_status_by_user', async function (req, res) {
    await OrderStatus.find({ 'userid': req.body.userid }).then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

router.post('/update-order-status', async function (req, res, next) {
    var { _id, ...data } = req.body
    await OrderStatus.updateOne({ _id: req.body._id }, data).then((result) => {
        res.json({ status: true, message: 'Order Status updated!' })
    }).catch((e) => {
        res.json({ status: false, message: 'Database Error' })
    })
})

module.exports = router;