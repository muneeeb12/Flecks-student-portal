import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './markks.css';
import { AuthContext } from '../../context/AuthContext';

const Marks = () => {
    const [courseData, setCourseData] = useState({
        c_id: '',
        c_name: '',
        type: '',
        credit_hour: '',
        mid_1: '',
        mid_2: '',
        assignment: '',
        quiz: '',
        final: '',
        studentId: ''

    });

    const { user } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [roll_num, setroll_num] = useState({
        roll_num: '',
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.post('http://localhost:1200/api/teachermarks/courses', { teacher_num: user.teacher_num });
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
            const response = await axios.post(`http://localhost:1200/api/teachermarks/student`, { c_id: courseId });
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }

        // Reset student-related state when the course changes
        setCourseData({
            ...courseData,
            c_id: courseId,
            mid_1: '',
            mid_2: '',
            quiz: '',
            final: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(roll_num.studentId);

        console.log(courseData.studentId);

        axios.post('http://localhost:1200/api/teachermarks/marks', courseData);


        
        // console.log(roll_num.studentId);
        axios.post('http://localhost:1200/api/Transcript/insert',{s_id : courseData.studentId})


        // console.log('Course data submitted:', courseData);
        // You might want to clear the form after submission
        setCourseData({
            ...courseData,
            mid_1: '',
            mid_2: '',
            quiz: '',
            assignment: '',
            final: ''
        });
    };

    return (
        <div className='container'>
            <h1>Add Marks</h1>
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
                <p className='para'>Mid_1 :</p>
                <input className='inp'
                        type="number"
                        name="mid_1"
                        value={courseData.mid_1}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>Mid_2 :</p>
                <input className='inp'
                        type="number"
                        name="mid_2"
                        value={courseData.mid_2}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>quiz :</p>
                <input className='inp'
                        type="number"
                        name="quiz"
                        value={courseData.quiz}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>Quiz :</p>
                <input className='inp'
                        type="number"
                        name="assignment"
                        value={courseData.assignment}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                <p className='para'>final :</p>
                <input className='inp'
                        type="number"
                        name="final"
                        value={courseData.final}
                        onChange={handleInputChange}
                        required
                    />

                </label>
                <div className='submitBtn'>
                <button type="submit" className="button">Add Marks</button>
                </div>
            </form>
        </div>
    );
}

export default Marks;
