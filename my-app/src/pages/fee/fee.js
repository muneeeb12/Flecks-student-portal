import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import './fee.css'; // Import your CSS file for styling

const Fee = () => {
    const [fee, setFee] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getFee = async () => {
            try {
                const res = await axios.post("http://localhost:1200/api/fee/fee", { roll_num: user.roll_num });
                setFee(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFee();
    }, [user]);

    return (
        <div className="fee-container">
            <h1>Fee Challan</h1>
            <div className="fee-details">
                {fee.map((item) => (
                    <div key={item.id} className="fee-item">

                        <span className="fee-label">Roll Number:</span>
                        <span className="fee-value">{item.s_id}</span>

                        <span className="fee-label">status:</span>
                        <span className="fee-value">{item.challan}</span>

                        <span className="fee-label">Amount:</span>
                        <span className="fee-value">{item.Amount}</span>

                        <span className="fee-label">due Date:</span>
                        <span className="fee-value">{item.due_date}</span>


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fee;
