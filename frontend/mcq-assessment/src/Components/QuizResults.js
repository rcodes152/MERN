// src/Components/QuizResults.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResults = () => {
    const navigate = useNavigate();

    const goToInstructions = () => {
        navigate('/instructions');
    };

    return (
        <div className="quiz-results">
            <h1>Quiz Results</h1>
            <p>Thank you for taking the quiz!</p>
            <button onClick={goToInstructions} className="btn-primary">Back to Instructions</button>
        </div>
    );
};

export default QuizResults;
