// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  volunteers: [{ userId: mongoose.Schema.Types.ObjectId, status: { type: String, default: 'Pending' } }],
});

module.exports = mongoose.model('Task', taskSchema);
