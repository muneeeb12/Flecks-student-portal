const express = require('express');
const  AttendenceUtils = require('./attendenceUtils');

const router = express.Router();

router.post('/setdata', (req, res) => {

    const { c_id, attend, lec_no, duration,date ,studentId} = req.body;

    AttendenceUtils.setdata(req.app.get('cor'), c_id, attend, lec_no, duration, date,studentId,res, (result) => {
        res.json(result);
      });
});


module.exports = router;