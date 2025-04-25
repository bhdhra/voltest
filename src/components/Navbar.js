import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className='navbar'>
      <div>
        <h1 className='navbar-title'>
          Voluntary Indian Organisations
        </h1>
      </div>
      <Link className='nav-links' to="/welcome">Home</Link>
      {!isAuthenticated ? (
        <>
          <Link className='nav-links' to="/login">Login</Link>
          <div>
            <Link className='nav-links' to="/register">Register</Link>
          </div>
        </>
      ) : (
        <button className='nav-links' onClick={onLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
