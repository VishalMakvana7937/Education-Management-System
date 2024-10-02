const Course = require('../models/Course');

exports.enrollStudent = async (req, res) => {
  const { studentId } = req.body;
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }
    res.status(200).json(course); // Respond with updated course data
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    course.students.pull(req.params.studentId);
    await course.save();
    res.status(200).json(course); // Respond with updated course data
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
