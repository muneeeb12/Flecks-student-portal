import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './attendence.css';
import { AuthContext } from '../../context/AuthContext';

const Attendence = () => {

    const [courseData, setCourseData] = useState({
        c_id: '',
        c_name: '',
        lec_no: '',
        attend: '',
        duration: '',
        date: '',
        studentId: '',
    });

    const { user } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.post('http://localhost:1200/api/teachermarks/courses',{teacher_num: user.teacher_num});
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [user]);

    const handleCourseChange = async (courseId) => {
        try {
            const response = await axios.post(`http://localhost:1200/api/teachermarks/student`, { c_id : courseId });
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }

        // Reset student-related state when the course changes
        setCourseData({
            ...courseData,
            c_id: courseId,
            lec_no: '',
            attend: '',
            duration: '',
            date: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });

        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(courseData);



        axios.post('http://localhost:1200/api/teacherattendence/setdata', courseData);




        // console.log('Course data submitted:', courseData);
        // You might want to clear the form after submission
        setCourseData({
            ...courseData,
            attend: '',
            lec_no: '',
            date: '',
            duration: '',
        });
    };

    return (
        <div className='container'>
            <h1>Add Attendence</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <label>
                <p className='para'>Select Course :</p>
                    <select
                        name="courseId"
                        value={courseData.courseId}
                        onChange={(e) => handleCourseChange(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.c_id}>{course.c_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                <p className='para'>Select Student :</p>
                    <select
                        name="studentId"
                        value={courseData.studentId}
                        onChange={(e) => setCourseData({ ...courseData, studentId: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select a student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.s_id}>{student.sname}</option>
                        ))}
                    </select>
                </label>
                <label>
                <p className='para'>duration of Class :</p>
                    <input className='inp'
                        type="text"
                        name="duration"
                        value={courseData.duration}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>Attendence :</p>
                    <input className='inp'
                        type="text"
                        name="attend"
                        placeholder='A/P'
                        value={courseData.attend}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>lec_no :</p>
                    <input className='inp'
                        type="text"
                        name="lec_no"
                        value={courseData.lec_no}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>Date :</p>
                    <input className='inp'
                        type="text"
                        name="date"
                        value={courseData.date = new Date().toISOString().slice(0, 10)}
                        placeholder='YYYY-MM-DD'
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div className='submitBtn'>
                <button type="submit" className="button">Add Attendence</button>
                </div>
            </form>
        </div>
    );
}

export default Attendence;
