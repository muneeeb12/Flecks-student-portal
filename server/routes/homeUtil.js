

const getHome = async (cor, roll_num) => {
  const studentQuery = `
    SELECT s.roll_num, s.sname, s.s_id, s.cnic, s.phone_no, s.batch, s.degree, s.email, s.Gender
    FROM student s
    WHERE roll_num LIKE '${roll_num}'`;

  try {
    const [studentResults] = await Promise.all([
      executeQuery(cor, studentQuery, [`%${roll_num}%`]),
    ]);

    if (studentResults.length === 0) {
      throw new Error('Student not found');
    }

    const studentDetails = {
      roll_num: studentResults[0].roll_num,
      sname: studentResults[0].sname,
      s_id: studentResults[0].s_id,
      cnic: studentResults[0].cnic,
      phone_no: studentResults[0].phone_no,
      batch: studentResults[0].batch,
      degree: studentResults[0].degree,
      email: studentResults[0].email,
      Gender: studentResults[0].Gender,

    };

    return studentDetails;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getCourses = async (cor, roll_num) => {
  const coursesQuery = `
    SELECT c.c_name, c.c_id
    FROM student s
    JOIN enrolled e ON e.s_id = s.s_id
    JOIN course c ON e.c_id = c.c_id
    WHERE s.roll_num LIKE '${roll_num}'`;

  try {
    const [coursesResults] = await Promise.all([
      executeQuery(cor, coursesQuery, [`%${roll_num}%`]),
    ]);

    const coursesDetails = coursesResults.map((result) => ({
      c_name: result.c_name,
      c_id: result.c_id,
    }));

    return coursesDetails;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getMarks = async (cor, roll_num) => {
  // Add your logic to fetch marks details
  const marksQuery = `
    SELECT m.c_id , m.mid_1, m.mid_2, m.final, m.quiz, m.assignment
    FROM marks m where m.s_id IN ( SELECT s.s_id FROM student s WHERE s.roll_num LIKE '%${roll_num}%' )`;

  try {
    const [marksResults] = await Promise.all([
      executeQuery(cor, marksQuery, [`%${roll_num}%`]),
    ]);

    const marksDetails = marksResults.map((result) => ({
      c_name: result.c_name,
      c_id: result.c_id,
      mid_1: result.mid_1,
      mid_2: result.mid_2,
      final: result.final,
      quiz: result.quiz,
      assignment: result.assignment,
    }));

    return marksDetails;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const getAttendance = async (cor, roll_num) => {
  const attendanceQuery = `
    SELECT 
      a.c_id, 
      COUNT(*) as total_lectures,
      SUM(CASE WHEN a.attend = 'P' THEN 1 ELSE 0 END) as present_count,
      SUM(CASE WHEN a.attend = 'A' THEN 1 ELSE 0 END) as absent_count
    FROM attendence a 
    WHERE a.s_id IN (SELECT s.s_id FROM student s WHERE s.roll_num LIKE '%${roll_num}%')
    GROUP BY a.c_id
  `;

  try {
    const [attendanceResults] = await Promise.all([
      executeQuery(cor, attendanceQuery, [`%${roll_num}%`]),
    ]);

    const attendanceDetails = attendanceResults.map((result) => ({
      c_id: result.c_id,
      total_lectures: result.total_lectures,
      present_count: result.present_count,
      absent_count: result.absent_count,
    }));
    console.log("attendanceDetails", attendanceDetails);
    return attendanceDetails;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};


const executeQuery = (cor, query, params) => {
  return new Promise((resolve, reject) => {
    cor.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};



module.exports = {
  getHome,
  getCourses,
  getMarks,
  getAttendance,
};
