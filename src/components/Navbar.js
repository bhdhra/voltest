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
      <a className='nav-links'>
        <Link to="/welcome">Home</Link>
      </a>
      {!isAuthenticated ? (
        <>
          <a className='nav-links'>
            <Link to="/login">Login</Link>
          </a>
          <div>
            <a className='nav-links'>
              <Link to="/register">Register</Link>
            </a>
          </div>
        </>
      ) : (
        <a className='nav-links'>
          <button onClick={onLogout}>Logout</button>
          </a>
      )}
    </nav>
  );
}

export default Navbar;
