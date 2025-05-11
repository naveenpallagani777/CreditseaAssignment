const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your env variables
    req.user = await User.findById(decoded.id); // Find user by ID decoded from token
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next(); // Continue to next middleware (route handler)
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;