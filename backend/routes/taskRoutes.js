// backend/routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  const { title, description, capacity } = req.body;
  const task = new Task({ title, description, capacity });
  await task.save();
  res.status(201).json(task);
});

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Show interest in a task
// Show interest in a task
router.post('/:taskId/interest', async (req, res) => {
    const { userId } = req.body; // User ID from frontend
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
  
    const alreadyAdded = task.volunteers.find(v => v.userId.toString() === userId);
    if (alreadyAdded) return res.status(400).json({ message: 'Already applied' });
  
    if (task.volunteers.length >= task.capacity) {
      return res.status(400).json({ message: 'Task has reached capacity' });
    }
  
    task.volunteers.push({ userId, status: 'Pending' });
    await task.save();
    res.json({ message: 'Interest submitted' });
  });
  
  // Admin approves/rejects a user
  router.patch('/:taskId/volunteer/:userId', async (req, res) => {
    const { status } = req.body; // status = "Approved" or "Rejected"
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
  
    const volunteer = task.volunteers.find(v => v.userId.toString() === req.params.userId);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
  
    volunteer.status = status;
    await task.save();
    res.json({ message: `Volunteer ${status}` });
  });
  
module.exports = router; // ✅ This is critical!
