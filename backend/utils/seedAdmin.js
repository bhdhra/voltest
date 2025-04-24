// backend/utils/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@volind.org' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@volind.org',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created');
  } else {
    console.log('✅ Admin already exists');
  }
};

module.exports = seedAdmin;
