import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MCQForm from './Components/MCQForm';
import LoginRegisterForm from './Components/LoginRegisterForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginRegisterForm />} />
          <Route path="/quiz" element={<MCQForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
