const Assignment = require('../models/Assignment');

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate, fileAttachment, maxMarks } = req.body;

        const assignment = new Assignment({
            title,
            description,
            dueDate,
            uploadedBy: req.user._id, // Assuming user is authenticated
            fileAttachment,
            maxMarks,
        });

        await assignment.save();
        res.status(201).json({ success: true, assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all assignments uploaded by the user
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ uploadedBy: req.user._id });
        res.status(200).json({ success: true, assignments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const assignment = await Assignment.findByIdAndUpdate(id, updates, { new: true });
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        res.status(200).json({ success: true, assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findByIdAndDelete(id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a comment to an assignment
exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        assignment.comments.push({ user: req.user._id, comment });
        await assignment.save();

        res.status(200).json({ success: true, assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Submit an assignment
exports.submitAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        assignment.status = 'submitted';
        assignment.submissionDate = new Date(); // Set the submission date
        await assignment.save();

        res.status(200).json({ success: true, assignment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
