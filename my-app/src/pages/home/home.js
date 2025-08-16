import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./home.css";
import { Modal, Button, Navbar, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Menu from "../../component/menu";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
const Home = () => {
  const { user } = useContext(AuthContext);
  const [studentDetails, setStudentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // Add state to control Menu visibility
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: "blue" });
  const [darkmode, setDarkmode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:1200/api/home/home',
          { roll_num: user.roll_num }
        );
        console.log(response.data);
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleCourseClick = (courseIndex) => {
    setSelectedCourseIndex(courseIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNavOptionClick = () => {
    setShowMenu(!showMenu);
  };




  

  return (
    <div className="main_container">
      <div className="check" >
        {studentDetails && (
          <>
            <h1 className="main">Welcome {studentDetails.studentDetails.sname}</h1>
            <hr />

            <h2 className="title">Student Details</h2>
            <div className="student-details">
              <p>
                <strong>Name:</strong> {studentDetails.studentDetails.sname}
              </p>

              <p>
                <strong>CNIC Number:</strong> {studentDetails.studentDetails.cnic}
              </p>
              <p>
                <strong>Phone Number:</strong> {studentDetails.studentDetails.phone_no}
              </p>
              <p>
                <strong>Email:</strong> {studentDetails.studentDetails.email}
              </p>
              <p>
                <strong>Address:</strong> {studentDetails.studentDetails.address}
              </p>
              <p>
                <strong>Gender: </strong>{studentDetails.studentDetails.Gender}
              </p>
            </div>

            <h2 className="title">Acedmic Details</h2>
            <div className="acedmic_details">
              <p>
                <strong>Roll Number:</strong> {studentDetails.studentDetails.roll_num}
              </p>
              <p>
                <strong>Batch:</strong> {studentDetails.studentDetails.batch}
              </p>
              <p>
                <strong>Degree:</strong> BS{studentDetails.studentDetails.degree}
              </p>
            </div>

            <h2 className="title">Family Details</h2>
            <div className="Family_Details">
              <p>
                <strong>Father Name:</strong>
              </p>
              <p>
                <strong>Father CNIC:</strong>
              </p>
            </div>
            <h2 className="title">Course Details</h2>
            <div className="course-details">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails &&
                    studentDetails.coursesDetails.map((course, index) => (
                      <tr key={index} onClick={() => handleCourseClick(index)}>
                        <td>{course.c_name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>



            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {studentDetails.coursesDetails[selectedCourseIndex]?.c_name} Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h3>Marks</h3>
                  <div style={{ maxWidth: "650px" }}>
                    {studentDetails && studentDetails.marksDetails && (
                      <Bar
                        key={selectedCourseIndex}

                        data={{
                          labels: ["Quiz", "Assignment", "Mid_1", "Mid_2", "Final"],
                          datasets: [
                            {
                              label: "100",
                              data: [studentDetails.marksDetails[selectedCourseIndex]?.quiz,
                              studentDetails.marksDetails[selectedCourseIndex]?.assignment,
                              studentDetails.marksDetails[selectedCourseIndex]?.mid_1,
                              studentDetails.marksDetails[selectedCourseIndex]?.mid_2,
                              studentDetails.marksDetails[selectedCourseIndex]?.final],
                              backgroundColor: ["aqua", "green", "red", "yellow", "blue"],
                              borderColor: ["aqua", "green", "red", "yellow", "blue"],
                              borderWidth: 7,
                            },
                          ],
                        }}
                        height={400}
                        options={{
                          scales: {
                            y: {
                              type: 'linear',
                              position: 'left',

                            },
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            
            <h2 className="title">Attendance Details</h2>
              <div className="attendence">

                  {studentDetails && (
                      <Bar className="bar" style={{ maxHeight: "400px" }}
                      data={{
                        labels: studentDetails.attendanceDetails.map((attendance) => attendance.c_id),
                        datasets: [
                          {
                            label: 'Present Count',
                            data: studentDetails.attendanceDetails.map((attendance) => attendance.present_count),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Absent Count',
                            data: studentDetails.attendanceDetails.map((attendance) => attendance.absent_count),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                          },
                        ],
                      }}
                      height={400}
                      options={{
                        indexAxis: 'y',
                        scales: {
                          x: { stacked: true },
                          y: { stacked: true },
                        },
                      }}
                    />
                  )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
