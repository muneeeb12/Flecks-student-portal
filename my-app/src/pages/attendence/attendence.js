import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './attendence.css';
import { AuthContext } from '../../context/AuthContext';

const Attendance = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [lectures, setLectures] = useState([]);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.post('http://localhost:1200/api/attendence/courses',{roll_num: user.roll_num});
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [user]);

    const fetchLectures = async (courseId) => {
        try {
            const response = await axios.post(`http://localhost:1200/api/attendence/attendence`, {roll_num: user.roll_num, c_id: courseId});
            setLectures(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleCourseClick = async (courseId) => {
        setSelectedCourse(courseId);
        fetchLectures(courseId);
    };

    return (
        <div className="container">
            <h1>Attendance</h1>
            <div className="data-container">
                <div className="course-buttons">
                    {courses.map((course) => (
                        <button
                            key={course.c_id}
                            className={selectedCourse === course.c_id ? 'button active' : 'button'}
                            onClick={() => handleCourseClick(course.c_id)}
                        >
                            {course.c_name}
                        </button>
                    ))}
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Lecture No</th>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Presence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lectures.map((lecture, index) => (
                                <tr key={index}>
                                    <td>{lecture.lec_no}</td>
                                    <td>{lecture.date}</td>
                                    <td>{lecture.duration}</td>
                                    <td>{lecture.attend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
