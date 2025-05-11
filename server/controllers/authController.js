const jwt = require('jsonwebtoken');
const { User, UserModel, AdminModel, VerifierModel } = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable in production

// Signup Controller
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    let newUser;

    if (role === 'user') {
      newUser = new UserModel({ username, password, role });
    } else if (role === 'admin') {
      newUser = new AdminModel({ username, password, role });
    } else if (role === 'verifier') {
      newUser = new VerifierModel({ username, password, role });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        username: newUser.username,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      message: 'Login successful', 
      token,
      user: {
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
