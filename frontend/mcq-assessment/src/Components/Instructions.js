import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Instructions.css'; // Ensure this import is included

const Instructions = () => {
    const navigate = useNavigate();

    const startQuiz = () => {
        navigate('/quiz');
    };

    return (
        <div className="instructions-card">
            <h1>Quiz Instructions</h1>
            <p>Welcome to the quiz! Please read the instructions carefully before you start.</p>
            <ul>
                <li>Each question has multiple choice answers.</li>
                <li>Select the best answer for each question.</li>
                <li>You have 10 minutes to complete the quiz.</li>
                <li>Your progress will be saved automatically.</li>
            </ul>
            <button onClick={startQuiz} className="btn-primary">Start Quiz</button>
        </div>
    );
};

export default Instructions;
