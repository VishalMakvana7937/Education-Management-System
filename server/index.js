require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const cors = require("cors");
const assignmentrouter = require('./routes/assignmentRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/assignments', assignmentrouter);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});

module.exports = app;
