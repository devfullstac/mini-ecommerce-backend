const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';

    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered', id: user.id });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.json({ token, role: user.role, username: user.username, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
