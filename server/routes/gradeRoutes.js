const express = require('express');
const { assignGrade, getGradesForCourse } = require('../controllers/gradeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const gradeRoutes = express.Router();

gradeRoutes.post('/', protect, authorizeRoles('Teacher'), assignGrade);
gradeRoutes.get('/:courseId', protect, authorizeRoles('Teacher', 'Admin'), getGradesForCourse);

module.exports = gradeRoutes;
