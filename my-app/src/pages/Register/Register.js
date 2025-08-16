import React, { useState, useEffect, useContext } from "react";
import axios, { all } from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const RegisterPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.post('http://localhost:1200/api/courses/get');
        console.log(response.data);
        setAllCourses(response.data);
      } catch (error) {
        console.error("Error fetching all courses:", error);
      }
    };

    // Fetch courses already registered by the user
    const fetchRegisteredCourses = async () => {
      try {
        const response = await axios.post(
          'http://localhost:1200/api/courses/registered',
          { roll_num: user.roll_num }
        );
        setRegisteredCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching registered courses:", error);
      }
    };

    fetchAllCourses();
    fetchRegisteredCourses();
  }, [user]);


  useEffect(() => {
    console.log("All courses:", allCourses);
    console.log("Registered courses:", registeredCourses);
  
    // Check if allCourses.courses is an array
    const available = Array.isArray(allCourses.courses)
      ? allCourses.courses.filter(
          (course) => !registeredCourses.find((regCourse) => regCourse.c_id === course.c_id)
        )
      : [];
  
    console.log("Available courses:", available);
    setAvailableCourses(available);
  }, [allCourses, registeredCourses]);
  


  const handleRegister = async (courseId) => {
    try {
      await axios.post('http://localhost:1200/api/courses/register', {
        roll_num: user.roll_num,
        course_id: courseId,
      });
      setRegisteredCourses([...registeredCourses, { c_id: courseId }]);
    } catch (error) {
      console.error("Error registering for the course:", error);
    }
  };

  const totalCreditHours = registeredCourses.reduce((total, course) => total + course.credit_hour, 0);
  return (
    <div className="container">
    <h1>Registration Page</h1>
  
    <div className="registered-courses">
      <h2>Registered Courses</h2>
      <ul>
        {registeredCourses.map((course) => (
          <li key={course.c_id}>{course.c_name} , credit_hour = {course.credit_hour} </li>
        ))}
        
      </ul>
      <p>Total Credit Hours: {totalCreditHours}</p>
      <p>Limit is 17</p>
    </div>
  
    <div className="available-courses">
      <h2>Available Courses</h2>
      <ul>
        {availableCourses.map((course) => (
          <li key={course.c_id}>
            {course.c_name} <button onClick={() => handleRegister(course.c_id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default RegisterPage;
