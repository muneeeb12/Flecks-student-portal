const express = require('express');
const authUtils = require('./authUtils');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log('saa');
const { teacher_num, password } = req.body; 
console.log(teacher_num, password);
authUtils.login(req.app.get('cor'), teacher_num, password, (result) => {
  res.json(result);
});
});


router.post('/register', (req, res) => {
  const { teacher_num, password } = req.body;
  authUtils.register(req.app.get('cor'), teacher_num, password, (result) => {
    res.json(result);
  });
});

module.exports = router;
