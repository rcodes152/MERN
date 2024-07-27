import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import './MCQForm.css';

const MCQForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 0) {
          clearInterval(timer);
          handleSubmit(); // Auto submit when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const formattedAnswers = questions.map((question, index) => ({
      questionId: question._id,
      selectedOption: answers[`q${index}`]
    }));



    axios.post('http://localhost:5000/api/quiz/submit', { userId: '12345677888626622', answers: formattedAnswers })
      .then(response => {
        console.log("hello",response)
        // Check if backend response contains score
        if (response.data.score !== undefined) {
          setScore(response.data.score);
        } else {
          // Calculate score on frontend if backend doesn't return it
          const correctAnswers = questions.map(question => question.correctAnswer);
          const userScore = formattedAnswers.reduce((total, answer, index) => {
            return total + (answer.selectedOption === correctAnswers[index] ? 1 : 0);
          }, 0);

          setScore(userScore * 100 / questions.length); // Assuming score is a percentage
        }
        setAnswers({}); // Clear answers after submission
        navigate('/results'); // Navigate to results page
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
    <div className="mcq-form-container">
      <h1>MCQ Assessment</h1>
      <div className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
      </div>
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="question-container">
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
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button type="button" onClick={handlePreviousQuestion} className="btn-secondary">
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button type="button" onClick={handleNextQuestion} className="btn-primary">
                Next
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button type="submit" className="btn-primary">Submit</button>
            )}
          </div>
        </form>
      )}
      {score !== null && (
        <div>
          <h2>Quiz Completed</h2>
          <h2>Your Score:</h2>
          <div style={{ width: '150px', height: '150px', margin: 'auto' }}>
            <CircularProgressbar
              value={score}
              text={`${score.toFixed(2)}%`}
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
