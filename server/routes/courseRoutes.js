const express = require('express');
const { createCourse, updateCourse, deleteCourse, getAllCourses } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const courseRoutes = express.Router();

courseRoutes.post('/', protect, authorizeRoles('Admin'), createCourse);
courseRoutes.get('/', protect, getAllCourses);
courseRoutes.put('/:id', protect, authorizeRoles('Admin', 'Teacher'), updateCourse);
courseRoutes.delete('/:id', protect, authorizeRoles('Admin'), deleteCourse);

module.exports = courseRoutes;
