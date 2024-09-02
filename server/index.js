const express = require('express');
const sql = require('mysql');
const bodyParser = require('body-parser');
// const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const marksRoute = require('./routes/marks');
const homeRoute = require('./routes/home')
const CourseRoute = require('./routes/courses')
const attendenceRoute = require('./routes/attendence')
const teacherauth = require('./teacherRoutes/auth')
const teacherhome = require('./teacherRoutes/home')
const teacherMarks = require('./teacherRoutes/marks')
const teacherattendence = require('./teacherRoutes/attendence')
const stdenttranscript = require('./routes/transcript')
const feeRoute = require('./routes/fee')

const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

var cor = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'class'
});

cor.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
});

app.set('cor', cor);


app.use("/api/auth", authRoute);
app.use('/api/marks',marksRoute);
app.use('/api/home',homeRoute)
app.use('/api/courses',CourseRoute)
app.use('/api/attendence',attendenceRoute)
app.use('/api/teacher',teacherauth)
app.use('/api/teacherhome',teacherhome)
app.use('/api/teachermarks',teacherMarks)
app.use("/api/Transcript", stdenttranscript);
app.use('/api/teacherattendence',teacherattendence)
app.use('/api/fee',feeRoute)



app.listen(1200, () => {
  console.log('Example app listening on port 1200!');
});
