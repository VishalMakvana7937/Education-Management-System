const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, teacher } = req.body;
  try {
    const course = await Course.create({ title, description, startDate, endDate, teacher });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email')
      .populate('students', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
