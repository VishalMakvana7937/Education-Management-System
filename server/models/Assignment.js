const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    fileAttachment: {
        type: String, // URL or path to the uploaded file
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'submitted', 'graded'],
        default: 'pending',
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who graded the assignment
        default: null,
    },
    submissionDate: {
        type: Date,
        default: null,
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User who made the comment
        },
        comment: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
    maxMarks: {
        type: Number,
        default: 100,
    },
    obtainedMarks: {
        type: Number,
        default: 0,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
