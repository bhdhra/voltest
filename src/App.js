import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard'; // Assuming you have an AdminDashboard component
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Welcome from './components/Welcome';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Track role
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  // Decode the token
        setIsAuthenticated(true);
        
        const userRole = decodedToken.role;  // Extract role from the decoded token
        setRole(userRole);  // Store the role in the state

        // Redirect based on the role
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
        setIsAuthenticated(false);
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const userRole = decodedToken.role; // Extract role from the decoded token
        setIsAuthenticated(true);
        setRole(userRole);

        // Navigate based on the role
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } catch (err) {
        console.error("Token decoding failed during login:", err);
        setIsAuthenticated(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard Route */}
      </Routes>
      <Footer />
    </>
  );
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
