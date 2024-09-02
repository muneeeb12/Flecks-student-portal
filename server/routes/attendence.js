const express = require('express');
const  attendenceUtils = require('./attendenceUtils');

const router = express.Router();

router.post('/attendence', (req, res) => {

    const { roll_num, c_id } = req.body;
    console.log(roll_num,c_id);
    attendenceUtils.getattendence(req.app.get('cor'), roll_num,c_id,res, (result) => {
        res.json(result);
      });
});

router.post('/courses', (req, res) => {
    const { roll_num } = req.body;
    attendenceUtils.getcourse(req.app.get('cor'),roll_num, res, (result) => {
        res.json(result);
      });

});



module.exports = router;
