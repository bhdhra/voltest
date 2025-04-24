// backend/routes/eventRoutes.js
const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Create new event - Admin only
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can create events' });
  }

  const { title, description, date, capacity } = req.body;
  const event = new Event({ title, description, date, capacity });
  try {
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Show interest in an event
router.post('/:eventId/interest', protect, async (req, res) => {
  const { userId } = req.body;
  const event = await Event.findById(req.params.eventId);
  
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const alreadyApplied = event.volunteers.find(v => v.userId.toString() === userId);
  if (alreadyApplied) return res.status(400).json({ message: 'You already applied' });

  if (event.volunteers.length >= event.capacity) {
    return res.status(400).json({ message: 'Event is full' });
  }

  event.volunteers.push({ userId, status: 'Pending' });
  await event.save();
  res.json({ message: 'Interest submitted successfully' });
});

// Admin approve/reject volunteer
router.patch('/:eventId/volunteer/:userId', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can approve/reject volunteers' });
  }

  const { status } = req.body;
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const volunteer = event.volunteers.find(v => v.userId.toString() === req.params.userId);
  if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

  volunteer.status = status;
  await event.save();
  res.json({ message: `Volunteer ${status}` });
});

module.exports = router;
