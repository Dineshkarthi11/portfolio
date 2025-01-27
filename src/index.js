import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px; /* Adjust size if needed */
  cursor: pointer;
  color: #666;
  padding: 4px;
  width: auto; /* Fit content */
  height: auto; /* Fit content */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s
