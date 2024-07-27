import React from 'react';

const Question = ({ question, options, onSelect, questionNumber }) => {
    return (
        <div className="question">
            <h2>Question {questionNumber}</h2>
            <p>{question}</p>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <button onClick={() => onSelect(option)}>{option}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
