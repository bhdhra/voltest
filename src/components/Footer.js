// frontend/src/components/Footer.js
import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Voluntary Indian Organisations</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
