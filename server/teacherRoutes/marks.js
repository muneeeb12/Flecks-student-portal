const express = require('express');
const  MarksUtils = require('./marksUtils');

const router = express.Router();

router.post('/courses', (req, res) => {

    const { teacher_num } = req.body;
    console.log(teacher_num);
    MarksUtils.getcourse(req.app.get('cor'), teacher_num, res, (result) => {
        res.json(result);
      });
});

router.post('/student', (req, res) => {

    const { c_id } = req.body;
    // console.log(teacher_num);
    MarksUtils.getstudent(req.app.get('cor'), c_id, res, (result) => {
        res.json(result);
      });
});


router.post('/marks', (req, res) => {

    const { c_id, mid_1, mid_2, assignment, quiz, final, studentId } = req.body;

    MarksUtils.addMarks(req.app.get('cor'), c_id, mid_1, mid_2, assignment, quiz, final,studentId, res, (result) => {
        res.json(result);
      });
});



module.exports = router;
