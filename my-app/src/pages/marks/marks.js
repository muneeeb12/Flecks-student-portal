import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './marks.css';
import { AuthContext } from '../../context/AuthContext';

const Marks = () => {
    const [marks, setMarks] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:1200/api/marks/marks', { roll_num: user.roll_num });
                console.log(response.data);
                setMarks(response.data);
            } catch (error) {
                console.error('Error fetching marks data:', error);
            }
        };

        fetchData();
    }, [user]);

    const calculateAverage = (mid1, mid2, quiz, final) => {
        // Your average calculation logic
        return ((mid1 + mid2 + quiz + final) / 4).toFixed(2);
    };


    return (
        <div className="container">
            <h1>Marks</h1>
            <div className="data-container">
                <div className="course-buttons">
                    {marks.map((course, index) => (
                        <button key={index} className="button">
                            {course.c_name}
                        </button>
                    ))}
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Mid_1</th>
                                <th>Mid_2</th>
                                <th>assignment</th>
                                <th>Quiz</th>
                                <th>Final</th>
                                <th>Obtained Marks</th>
                                <th>Full Marks</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.c_name}</td>
                                    <td>{course.mid_1}</td>
                                    <td>{course.mid_2}</td>
                                    <td>{course.assignment}</td>
                                    <td>{course.quiz}</td>
                                    <td>{course.final}</td>
                                    <td>{course.mid_1 + course.mid_2 + course.assignment + course.quiz + course.final}</td>
                                    <td>100</td>
                                    <td>{calculateAverage(course.mid_1, course.mid_2, course.quiz, course.final)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Marks;
