var express = require('express')
var router = express.Router()
var Company = require('./DatabaseModel/companyModel')

router.get('/display_graph_data_company', async function (req, res) {
    await Company.find({}).select('orderamount orderdate selectedStateFee companyAmount').then((result) => {
        res.json({ status: true, data: result })
    }).catch((e) => {
        res.json({ status: false })
    })
})

module.exports = router;