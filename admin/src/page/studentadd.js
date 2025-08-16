import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Studentadd = () => {
  const [formData, setFormData] = useState({
    sname: '',
    email: '',
    phone_no: '',
    cnic: '',
    batch: '',
    gender: '',
    Degree: '',
    roll_num: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:1200/api/student', formData);

    setFormData({

        sname: '',
        email: '',
        phone_no: '',
        cnic: '',
        batch: '',
    })


  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="sname" value={formData.sname} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} />
        </label>
        <br />
        <label>
            CNIC:
            <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} />
        </label>
        <br />
        <label>
            Batch:
            <input type="text" name="batch" value={formData.batch} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default Studentadd;
