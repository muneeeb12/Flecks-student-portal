const express = require('express');
const HomeUtils = require('./homeUtil');

const router = express.Router();

const { getHome, getCourses, getMarks, getAttendance } = HomeUtils;

router.post('/home', async (req, res) => {
  const { roll_num } = req.body;
  try {
    const studentDetails = await getHome(req.app.get('cor'), roll_num);
    const coursesDetails = await getCourses(req.app.get('cor'),roll_num);
    const marksDetails = await getMarks(req.app.get('cor'), roll_num);
    const attendanceDetails = await getAttendance(req.app.get('cor'), roll_num);

    const responseData = {
      studentDetails,
      coursesDetails,
      marksDetails,
      attendanceDetails,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from the server' });
  }
});

module.exports = router;

