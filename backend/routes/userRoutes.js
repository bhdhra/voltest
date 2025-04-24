const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Create JWT token with user id and role
  const token = jwt.sign({ id: user._id, role: 'User' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  // Send token and role back to frontend
  res.json({ token, role: 'User' });
});

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    // Save new user to database
    await newUser.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser._id, role: 'User' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return a success response with token and role
    res.status(201).json({ message: 'User registered successfully', token, role: 'User' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

module.exports = router;
