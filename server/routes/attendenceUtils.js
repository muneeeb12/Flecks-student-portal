

const express = require('express');


const getattendence = async (cor, roll_num,c_id, res) => {
  const query = `
      SELECT *
      FROM attendence a
      where a.c_id = '${c_id}' and a.s_id = (select s_id from student where roll_num = '${roll_num}')
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

      console.log(results);
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


  const getcourse = async (cor,roll_num, res) => {
    const query = `
        SELECT *
        FROM course c
        join enrolled e ON e.c_id = c.c_id
        join student s ON e.s_id = s.s_id
        WHERE s.roll_num LIKE '%${roll_num}%'
          ;
    `;
  
    try {
        const results = await new Promise((resolve, reject) => {
            cor.query(query, (err, results) => {
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
        console.log(results);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
  };


  module.exports = {
    getattendence,
    findByStudentId,
    getcourse
  };

