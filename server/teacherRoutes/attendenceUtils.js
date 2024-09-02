
const uuid = require('uuid');

const setdata = async (cor, c_id, attend, lec_no, duration, date, studentId, res) => {
  const attendence_id = uuid.v4();
  const s_id = studentId;

  const sql = 'INSERT INTO attendence (attendence_id, c_id, attend, lec_no, duration, date, s_id) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const values = [attendence_id, c_id, attend, lec_no, duration, date, s_id];

  cor.query(sql, values, async (err, result) => {
    if (err) {
      console.error('Error setting attendance:', err);
      return res.status(500).json({ error: 'Error setting attendance' });
    }
    alert("Attendance Marked");
    res.status(200).json({ attendance: result });
  });
};


module.exports = {
    setdata
};