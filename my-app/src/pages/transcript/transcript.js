// Import the CSS file
import './transcript.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Transcript = () => {
    const [student, setStudent] = useState([]);
    const [courses, setCourses] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1200/api/Transcript/getdata', { roll_num: user.roll_num });
                console.log(response.data);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }

        };

        fetchData();
    }, [user]);



    return (
        <>
            <div className='personal'>
                <h1>Personal Information</h1>
                <p>Student ID: {user.roll_num}</p>
            </div>
            <div className="transcript">
                <h1>Transcript</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Course Credit Hours</th>
                            <th>Type</th>
                            <th>Grade</th>
                            <th>CGPA</th>
                            <th>SGPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.map((course) => (
                            <tr>
                                <td>{course.c_id}</td>
                                <td>{course.c_name}</td>
                                <td>{course.credit_hour}</td>
                                <td>{course.type}</td>
                                <td>{course.Grade}</td>
                                <td>{course.CGPA}</td>
                                <td>{course.SGPA}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Transcript;
