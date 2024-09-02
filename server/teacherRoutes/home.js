const express = require('express');
const HomeUtils = require('./homeutil');

const router = express.Router();

router.post('/home', (req, res) => {
  const { teacher_num } = req.body;

  // console.log('roll_num:', roll_num);

  HomeUtils.getHome(req.app.get('cor'), teacher_num, res, (result) => {
    res.json(result);
  });
});


router.post('/getstudent', (req, res) => {
  const { teacher_num , c_id} = req.body;

  // console.log('roll_num:', roll_num);

  HomeUtils.getstudent(req.app.get('cor'), teacher_num,c_id, res, (result) => {
    res.json(result);
  });
});

module.exports = router;
