import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./home.css";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [teacherDetails, setteacherDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentsEnrolled, setStudentsEnrolled] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:1200/api/teacherhome/home',
          { teacher_num: user.teacher_num }
        );
        setteacherDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const fetchStudentsEnrolled = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost:1200/api/teacherhome/getstudent',
        { teacher_num: user.teacher_num, c_id: courseId }
      );
      setStudentsEnrolled(response.data);
    } catch (error) {
      console.error("Error fetching students enrolled data:", error);
    }
  };


  const handleCourseClick = async (courseIndex) => {
    const selectedCourse = teacherDetails.courses[courseIndex];
    if (selectedCourse) {
      setSelectedCourse(selectedCourse);
      fetchStudentsEnrolled(selectedCourse.c_id);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Welcome to {teacherDetails.tname}</h1>
      <h2 className="title">Teacher Details</h2>
      <div className="teacher_details">
        <p>
          <strong>Name:</strong> {teacherDetails.tname}
        </p>
        <p>
          <strong>CNIC Number:</strong> {teacherDetails.cnic}
        </p>
        <p>
          <strong>Email Number:</strong> {teacherDetails.email}
        </p>
        <p>
          <strong>department:</strong> {teacherDetails.department}
        </p>
        <p>
          <strong>Phone Number:</strong> {teacherDetails.phone_no}
        </p>
        
      </div>

      <h2 className="title">Acedmic Details</h2>
      <div className="acedmic_details">
        <p>
          <strong>Teacher Number:</strong> {teacherDetails.teacher_num}
        </p>
        <p>
          <strong>Course:</strong> {teacherDetails.courses && teacherDetails.courses.length}
        </p>
        <p>
          <strong>qualification:</strong> {teacherDetails.qualification}
        </p>
      </div>


      <h2 class="title">Course Details</h2>
    <table>
        <thead>
            <tr>
                <th>Course</th>
            </tr>
        </thead>
        <tbody>
            {teacherDetails.courses && teacherDetails.courses.map((course, index) => (
                <tr key={index} onClick={() => handleCourseClick(index)}>
                    <td>{course.c_name}</td>
                </tr>
            ))}
        </tbody>
    </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCourse && selectedCourse.c_name} Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Students Enrolled</h3>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th> Batch</th>
                <th>Degree</th>
              </tr>
            </thead>
            <tbody>
              {studentsEnrolled.map((student, index) => (
                <tr key={index}>
                  <td>{student.roll_num}</td>
                  <td>{student.sname}</td>
                  <td>{student.batch}</td>
                  <td>{student.degree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
