const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const seedAdmin = require('./utils/seedAdmin');
const taskRoutes = require('./routes/taskRoutes'); // ✅ should point to the correct file
dotenv.config();

const app = express();

// CORS setup to allow credentials and specific origin
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,               // Allow cookies and credentials to be sent with requests
};

app.use(cors(corsOptions));  // Enable CORS with the specified options
app.use(express.json());     // Middleware to parse JSON bodies

// 🔧 Import routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// 🔗 Use routes
app.use('/api/admin', adminRoutes); // Uncomment if needed
app.use('/api/user', userRoutes);  // Register
app.use('/api/tasks', taskRoutes); // ✅ Add this line for tasks route

// 📦 MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedAdmin(); // Seed admin user if needed
  })
  .catch(err => console.log('❌ MongoDB Error:', err));

// 🚀 Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
