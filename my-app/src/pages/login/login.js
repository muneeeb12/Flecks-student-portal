// Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ roll_num: undefined, password: undefined });
  const { dispatch } = useContext(AuthContext);
  const [forgetData, setForgetData] = useState({cnic:undefined, roll_num: undefined, password: undefined });
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleCancelClick = () => {
    setShowForgotPassword(false);
  };

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChange2 = (e) => {
    setForgetData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('http://localhost:1200/api/auth/login', loginData);
      console.log(response.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      if (response.data.success) {
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data });
      console.error('Error logging in:', error.message);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (forgetData.password !== forgetData.confirm_password) {
      alert("Passwords don't match");
      return;
    }
    else{
      await axios.post('http://localhost:1200/api/auth/forget', forgetData);

      alert('Password Changed Successfully');
      setShowForgotPassword(false);

    }
  }

  return (
    <div className="login-portal">
      <form onSubmit={handleLoginSubmit}>
        <div className="login-rollnum">
          <label htmlFor="roll_num"><b>Roll Number</b></label>
          <input
            type="text"
            placeholder="Enter the roll number"
            id="roll_num"
            value={loginData.roll_num}
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="login-password">
          <label htmlFor="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter the password"
            id="password"
            value={loginData.password}
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
      <div className="forgot-password">
        <button type="button" className="forgotbtn" onClick={handleForgotPasswordClick}>
          Forgot Password?
        </button>
      </div>

      {showForgotPassword && (
        <div className="forgot-div2">
          <form onSubmit={handleForgotPasswordSubmit}>
          <div className="forgot-div">
              <label htmlFor="cnic"><b>cnic</b></label>
              <input
                type="text"
                placeholder="Enter the Cnic number"
                id="cnic"
                value={forgetData.cnic}
                onChange={handleChange2}
                className="fInput"
              />
            </div>
            <div className="forgot-div">
              <label htmlFor="roll_num"><b>roll_num</b></label>
              <input
                type="text"
                placeholder="Enter the roll number"
                id="roll_num"
                value={forgetData.roll_num}
                onChange={handleChange2}
                className="fInput"
              />
            </div>
            <div className="forgot-div">
              <label htmlFor="password"><b>New Password</b></label>
              <input
                type="password"
                placeholder="Enter the new password"
                id="password"
                value={forgetData.password}
                onChange={handleChange2}
                className="fInput"
              />
            </div>
            <div className="forgot-div">
              <label htmlFor="password"><b>Confirm Password</b></label>
              <input
                type="password"
                placeholder="Confirm the new password"
                id="confirm_password"
                onChange={handleChange2}
                className="fInput"
              />
            </div>
            <div className="forgot-btn">
              <button type="submit" className="forgotbtn">
                Submit
              </button>
              <button type="button" className="forgotbtn" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
