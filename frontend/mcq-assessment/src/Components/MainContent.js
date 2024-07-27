// src/components/MainContent.js
import React from 'react';
import './MainContent.css';

const MainContent = ({ selectedModule }) => {
  return (
    <div className="main-content">
      {selectedModule ? (
        <div className="video-container">
          <h2>{selectedModule.name}</h2>
          <p>{selectedModule.description}</p>
          <iframe
            src={selectedModule.videoUrl}
            title={selectedModule.name}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="placeholder">
          Please select a module to view the course.
        </div>
      )}
    </div>
  );
};

export default MainContent;
