const express = require('express');
const authUtils = require('./authUtils');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log('saa');
const { roll_num, password } = req.body; 
console.log(roll_num, password);
authUtils.login(req.app.get('cor'), roll_num, password, (result) => {
  res.json(result);
});
});


router.post('/register', (req, res) => {
  const { roll_num, password } = req.body;
  authUtils.register(req.app.get('cor'), roll_num, password, (result) => {
    res.json(result);
  });
});


router.post('/forget', (req, res) => {
  const { cnic , roll_num, password } = req.body;
  authUtils.forget(req.app.get('cor'), roll_num, cnic ,password, (result) => {
    res.json(result);
  });
});

module.exports = router;
