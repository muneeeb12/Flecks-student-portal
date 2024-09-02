

const express = require('express');
const router = express.Router();

const feeUtils = require('./feeUtils');

router.post('/fee', (req, res) => {
    const {roll_num} = req.body;

    feeUtils.getFee(req.app.get('cor'), roll_num,res, (result) => {
        res.json(result);
    });

});


module.exports = router;