import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading when submitting form
    console.log('Submitting registration...', formData);

    try {
      const response = await axios.post('/user/register', formData);  // Send POST request to register
      console.log('Registration response:', response.data);
      alert('Registration successful. Please login.');
      navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      console.error('Registration failed:', err?.response?.data || err.message);
      alert('Registration failed: ' + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);  // Stop loading once the request is finished
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
