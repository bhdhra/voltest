const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // make sure this path is correct
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await User.findOne({ email: 'admin@volind.org' });

  if (existingAdmin) {
    console.log('✅ Admin already exists');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new User({
    name: 'Admin',
    email: 'admin@volind.org',
    password: hashedPassword,
    role: 'admin',
  });

  await admin.save();
  console.log('✅ Admin created successfully');
  mongoose.disconnect();
};

seedAdmin();
