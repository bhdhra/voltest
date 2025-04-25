import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
// Correct named import for jwt-decode
import { jwtDecode } from 'jwt-decode';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      // Store the token in local storage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decode the token to get the user's role
      const decodedToken = jwtDecode(token); // Use the correct named import
      console.log(decodedToken); // Log the decoded token to check

      const userRole = decodedToken.role; // Access role from decoded token

      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/user-dashboard');
      } else if (userRole === 'User') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); // Default route if the role is not recognized
      }

      if (onLogin) onLogin(); // Update auth state in parent component
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
