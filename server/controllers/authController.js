const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id, user.role);
    res.status(200).json({ token, userType: user.role }); // Include userType in response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
