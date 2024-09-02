

const express = require('express');


const getmarks = async (cor, roll_num, res) => {
  const query = `
      SELECT marks.*, course.c_name ,course.type,course.credit_hour
      FROM marks
      INNER JOIN course ON marks.c_id = course.c_id
      WHERE marks.s_id = (SELECT s_id FROM student WHERE roll_num = '${roll_num}')
      ;
  `;
  
  try {
      const results = await new Promise((resolve, reject) => {
          cor.query(query, [roll_num], (err, results) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(results);
              }
          });
      });

      if (results.length === 0) {
          return res.status(404).json({ error: 'Student not found' });
      }
      console.log("results: ", results);
      res.status(200).json(results);
  } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error querying the database' });
  }
};


const findByStudentId = (roll_num) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM marks WHERE roll_num = '${roll_num}'`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          reject({ success: false, message: 'Error fetching marks' });
        } else {
          resolve({ success: true, message: 'Marks fetched successfully', details: result });
        }
      });
    });
  };


  const getstudent = async (cor, roll_num, res) => {
    const sql = `SELECT * FROM student WHERE roll_num = '${roll_num}'`;
      cor.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          reject({ success: false, message: 'Error fetching marks' });
        } else {
          res.status(200).json(result);
        }
      });
    }



  module.exports = {
    getmarks,
    findByStudentId,
    getstudent
  };

