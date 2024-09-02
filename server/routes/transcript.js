
const  Transcript = require('./transcriptUtils');

const express = require('express');
const router = express.Router();

router.post('/insert', (req, res) => {

    const { s_id } = req.body;
    Transcript.insert(req.app.get('cor'), s_id, res, (result) => {
        res.json(result);
      });

});

router.post('/getdata', (req, res) => {

    const { roll_num } = req.body;
    console.log(roll_num);
    Transcript.getdata(req.app.get('cor'), roll_num, res, (result) => {
        res.json(result);
      });

});

module.exports = router;