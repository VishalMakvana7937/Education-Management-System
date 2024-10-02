const express = require('express');
const { enrollStudent, removeStudent } = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const enrollmentRoutes = express.Router();

// Enroll a student in a course
enrollmentRoutes.post('/:courseId/enroll', protect, authorizeRoles('Admin', 'Teacher'), enrollStudent);

// Remove a student from a course
enrollmentRoutes.delete('/:courseId/remove/:studentId', protect, authorizeRoles('Admin', 'Teacher'), removeStudent);

module.exports = enrollmentRoutes;
