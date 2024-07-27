// src/Components/MCQForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MCQForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedAnswers = questions.map((question, index) => ({
      questionId: question._id,
      selectedOption: answers[`q${index}`]
    }));

    axios.post('http://localhost:5000/api/quiz/submit', { userId: 'test-user-id', answers: formattedAnswers })
      .then(response => {
        setScore(response.data.score);
        setAnswers({}); // Clear answers after submission
      })
      .catch(err => console.error('Error submitting quiz answers:', err));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>MCQ Assessment</h1>
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <h3>{questions[currentQuestionIndex].questionText}</h3>
            {questions[currentQuestionIndex].options.map((option, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <input
                  type="radio"
                  id={`q${currentQuestionIndex}o${i}`}
                  name={`q${currentQuestionIndex}`}
                  value={option}
                  checked={answers[`q${currentQuestionIndex}`] === option}
                  onChange={handleChange}
                />
                <label htmlFor={`q${currentQuestionIndex}o${i}`}>{option}</label>
              </div>
            ))}
          </div>
          <div>
            {currentQuestionIndex > 0 && (
              <button type="button" onClick={handlePreviousQuestion}>
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button type="button" onClick={handleNextQuestion}>
                Next
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      )}
      {score !== null && (
        <div>
          <h2>Your Score:</h2>
          <div style={{ width: '150px', height: '150px', margin: 'auto' }}>
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                strokeLinecap: 'round',
                textSize: '16px',
                pathColor: '#00aaff',
                textColor: '#00aaff',
                trailColor: '#d9d9d9',
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQForm;
