
const util = require('util');
const uuid = require('uuid');
const axios = require('axios');
const { promisify } = util;

const insert = async (cor, s_id, res) => {
    
    try {
        const sql2 = `SELECT roll_num from student where s_id LIKE '${s_id}'`;
        
        const queryAsync = promisify(cor.query).bind(cor);
        const result2 = await queryAsync(sql2);

        if (result2.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const roll_num = result2[0].roll_num;

        console.log("roll_num ", roll_num);

        const studentResponse = await axios.post('http://localhost:1200/api/marks/marks', { roll_num });

        console.log("studentResponse: ", studentResponse.data);



        let CGPA = 0;
        let SGPA = 0;
        let count = 0;

        console.log("studentResponse.data: ", studentResponse.data);
        let mul = 0;

        const transcriptValues = studentResponse.data.map((course) => {
            const transcript_id = uuid.v4();
            count += course.credit_hour;
            const Grade = calculategrade(course.mid_1, course.mid_2, course.quiz, course.final, course.assignment);
            mul += Grade * course.credit_hour;
            SGPA = mul / count;
            CGPA = '-';
            return `('${s_id}', '${course.c_id}', '${transcript_id}', '${Grade}', '${CGPA}', '${SGPA}', '${course.credit_hour}', '${course.c_name}' , '${course.type}')`;
        });



        const sql = `INSERT INTO transcript (s_id, c_id, transcript_id, Grade, CGPA, SGPA, credit_hour, c_name,type) VALUES 
            ${transcriptValues.join(', ')}`;

        const result = await queryAsync(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error inserting data into the transcript table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getdata = async (cor, roll_num, res) => {
    try {
        const query = `
            SELECT * FROM transcript WHERE s_id LIKE (SELECT s_id FROM student WHERE roll_num LIKE '%${roll_num}%');
        `;
        
        const queryAsync = promisify(cor.query).bind(cor);
        const results = await queryAsync(query, [roll_num]);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Rest of the code remains unchanged





const calculategrade = (mid_1, mid_2, quiz, final, assignment) => {
    let grade = 0;
    let mid_12 = parseInt(mid_1);
    let mid_22 = parseInt(mid_2);
    let quiz2 = parseInt(quiz);
    let final2 = parseInt(final);
    let assignment2 = parseInt(assignment);

    let total = mid_12 + mid_22 + quiz2 + final2 + assignment2;

    if(total >= 90){
        grade = 4.0;
    }
    else if(total >= 85){
        grade = 3.7;
    }
    else if(total >= 80){
        grade = 3.3;
    }
    else if(total >= 75){
        grade = 3.0;
    }
    else if(total >= 70){
        grade = 2.7;
    }
    else if(total >= 65){
        grade = 2.3;
    }
    else if(total >= 60){
        grade = 2.0;
    }
    else if(total >= 55){
        grade = 1.7;
    }
    else if(total >= 50){
        grade = 1.3;
    }
    else if(total >= 45){
        grade = 1.0;
    }
    else if(total >= 40){
        grade = 0.7;
    }
    else{
        grade = 0.0;
    }
    return grade;
};

module.exports = {
    insert,
    getdata
};
