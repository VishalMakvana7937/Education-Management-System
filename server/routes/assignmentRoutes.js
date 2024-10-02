const express = require('express');
const {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment,
    addComment,
    submitAssignment,
} = require('../controllers/assignmentController');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const assignmentrouter = express.Router();

// Create a new assignment
assignmentrouter.post('/', protect, authorizeRoles('Admin', 'Teacher'), createAssignment);

// Get all assignments
assignmentrouter.get('/', protect, getAssignments);

// Update an assignment
assignmentrouter.put('/:id', protect, authorizeRoles('Admin', 'Teacher'), updateAssignment);

// Delete an assignment
assignmentrouter.delete('/:id', protect, authorizeRoles('Admin', 'Teacher'), deleteAssignment);

// Add a comment to an assignment
assignmentrouter.post('/:id/comments', protect, authorizeRoles('Admin', 'Teacher'), addComment);

// Submit an assignment
assignmentrouter.put('/:id/submit', protect, authorizeRoles('Admin', 'Teacher'), submitAssignment);

module.exports = assignmentrouter;
