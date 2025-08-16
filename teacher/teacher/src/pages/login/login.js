// Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './login.css';
import { useHistory, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

// ... (import statements)

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ teacher_num: undefined, password: undefined });

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleCancelClick = () => {
    setShowForgotPassword(false);
  };

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
        console.log(loginData);
      const response = await axios.post('http://localhost:1200/api/teacher/login', loginData);
      console.log(response.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      // Handle success or display an error message to the user
      if (response.data.success) {
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-portal">
      <form action="#" onSubmit={handleLoginSubmit}>
        <div className="login-rollnum">
          <label htmlFor="login-rollnum"><b>Roll Number</b></label>
          <input
          type="text"
          placeholder="Enter the Teacher id:"
          id="teacher_num"
          onChange={handleChange}
          className="lInput"
        />
        </div>
        <div className="login-password">
          <label htmlFor="login-psw"><b>Password</b></label>
          <input
          type="password"
          placeholder="Enter the password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        </div>
        <div className="login-btn">
          <button type="submit" className="loginbtn">
            Login
          </button>
        </div>
      </form>

      {showForgotPassword && (
        <div className="forgot-div2">
          <form action="#" onSubmit={handleForgotPasswordClick}>
            {/* ... (your existing forgot password form fields) */}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
