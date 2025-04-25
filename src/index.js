import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithRouter from './App'; // Import AppWithRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithRouter /> {/* Use AppWithRouter here */}
  </React.StrictMode>
);
