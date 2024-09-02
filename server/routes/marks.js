const express = require('express');
const  MarksUtils = require('./marksUtils');

const router = express.Router();

router.post('/marks', (req, res) => {

    const { roll_num } = req.body;
    console.log(roll_num);
    MarksUtils.getmarks(req.app.get('cor'), roll_num, res, (result) => {
        res.json(result);
      });
});

router.post('/getstudent', (req, res) => {

  const { roll_num } = req.body;
  console.log(roll_num);
  MarksUtils.getstudent(req.app.get('cor'), roll_num, res, (result) => {
      res.json(result);
    });
});




module.exports = router;
