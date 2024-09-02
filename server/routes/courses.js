const express = require('express');
const courseUtils = require('./coursesUtil');

const router = express.Router();

router.post('/get', (req, res) => {

courseUtils.getdata(req.app.get('cor'),res, (result) => {
  res.json(result);
});
});


router.post('/registered', (req, res) => {
  const { roll_num } = req.body;
  courseUtils.registered(req.app.get('cor'), roll_num,res, (result) => {
    res.json(result);
  });
});


router.post('/register', (req, res) => {
    const { roll_num, course_id } = req.body;
    courseUtils.register(req.app.get('cor'), roll_num, course_id, res,(result) => {
      res.json(result);
    });
  });

module.exports = router;
