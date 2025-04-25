import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { getToken } from '../utils/auth';
import './Dashboard.css';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = getToken();
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUserId(decoded.id);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/tasks');
    setTasks(res.data);
  };

  const showInterest = async (taskId) => {
    try {
      await axios.post(`/tasks/${taskId}/interest`, { userId }, {
        headers: { Authorization: getToken() },
      });
      alert('Interest sent!');
      fetchTasks();
    } catch (err) {
      alert('Error: ' + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Welcome To Event Dashboard</h2>
      {tasks.map(task => (
        <div key={task._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Capacity: {task.capacity}</p>
          <p>Volunteers: {task.volunteers.length}</p>
          {!task.volunteers.some(v => v.userId === userId) && (
            <button onClick={() => showInterest(task._id)}>Show Interest</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
