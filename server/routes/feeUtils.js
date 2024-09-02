

const express = require('express');

const getFee = async (cor, roll_num, res) => {
    const query = `SELECT * FROM feechallan WHERE s_id = (SELECT s_id FROM student WHERE roll_num = ${roll_num})`;
    cor.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

module.exports = {
    getFee
}