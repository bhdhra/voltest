import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { getToken } from '../utils/auth';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '', // Added date field for events
    capacity: 1,
  });

  // Fetch tasks (events) when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks (events)
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data); // Ensure this is the correct data structure from the backend
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Create a new task (event)
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', newTask, {
        headers: { Authorization: getToken() },
      });
      setNewTask({ title: '', description: '', date: '', capacity: 1 }); // Reset form
      fetchTasks(); // Reload tasks after creating a new one
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  // Update volunteer status (approve or reject)
  const updateStatus = async (taskId, userId, status) => {
    try {
      await axios.patch(`/tasks/${taskId}/volunteer/${userId}`, { status }, {
        headers: { Authorization: getToken() },
      });
      fetchTasks(); // Reload tasks after updating volunteer status
    } catch (err) {
      console.error('Error updating volunteer status:', err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Create Event Form */}
      <form onSubmit={createTask}>
        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newTask.capacity}
          onChange={(e) => setNewTask({ ...newTask, capacity: Number(e.target.value) })}
        />
        <button type="submit">Create Event</button>
      </form>

      {/* Display Existing Tasks (Events) */}
      {tasks.length === 0 ? (
        <p>No events found. Please create an event.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Date: {new Date(task.date).toLocaleDateString()}</p>
            <p>Capacity: {task.capacity}</p>

            <h5>Volunteers:</h5>
            <ul>
              {task.volunteers.map((v) => (
                <li key={v.userId}>
                  <span>{v.userId}</span> - {v.status}
                  {v.status === 'Pending' && (
                    <>
                      <button onClick={() => updateStatus(task._id, v.userId, 'Approved')}>Approve</button>
                      <button onClick={() => updateStatus(task._id, v.userId, 'Rejected')}>Reject</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
