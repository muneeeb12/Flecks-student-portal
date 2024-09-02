const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to import jwt

const login = (cor, teacher_num, password, callback) => {
  console.log(teacher_num);
  const sql = "SELECT * FROM teacher WHERE teacher_num LIKE '%"+teacher_num+"%'"
  cor.query(sql,[teacher_num],async(err, results)=>{
    if (err) {
      console.error('Database query error:', err);
      return callback({ success: false, message: 'Error querying the database' });
    }

    console.log(results);
    
    if (results.length > 0) {
      const user = results[0];

      // Use bcrypt to compare password

        if (password === user.password) {
          const token = jwt.sign(
            { id: user.s_id },
            process.env.JWT_SECRET || '1234'
          );

          return callback({
            success: true,
            message: 'Authentication successful!',
            token,
            id: user.s_id,
            teacher_num: user.teacher_num,
          });
        }
      return callback({ success: false, message: 'Incorrect password' });
    }
    return callback({ success: false, message: 'User not found' });
  });
};


const register = (cor, teacher_num, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Password hashing error:', err);
      callback({ success: false, message: 'Error hashing the password' });
    } else {
      const query = 'INSERT INTO student (teacher_num, password) VALUES (?, ?)';
      cor.query(query, [teacher_num, hashedPassword], (dbErr) => {
        if (dbErr) {
          console.error('Database query error:', dbErr);
          callback({
            success: false,
            message: 'Error inserting student into the database',
          });
        } else {
          callback({
            success: true,
            message: 'Student registered successfully!',
          });
        }
      });
    }
  });
};

module.exports = { login, register };
