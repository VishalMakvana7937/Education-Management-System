const Grade = require('../models/Grade');

exports.assignGrade = async (req, res) => {
  const { student, course, grade } = req.body;
  try {
    const gradeRecord = await Grade.create({ student, course, grade });
    res.status(201).json(gradeRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGradesForCourse = async (req, res) => {
  try {
    const grades = await Grade.find({ course: req.params.courseId }).populate('student', 'name');
    res.status(200).json(grades);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
