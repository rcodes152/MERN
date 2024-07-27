// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ modules, onSelectModule }) => {
  return (
    <div className="sidebar">
      <ul>
        {modules.map((module, index) => (
          <li key={index} onClick={() => onSelectModule(module)}>
            {module.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
