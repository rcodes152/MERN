import React, { useState, useEffect } from 'react';
import Instructions from './Instructions';
import Question from './Question';
import './Quiz.css';
import './quizz.css';

const Quiz = () => {
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds

    useEffect(() => {
        if (started) {
            fetchQuestions();
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev === 0) {
                        clearInterval(timer);
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [started]);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/quiz-questions');
            const data = await response.json();
            console.log('Fetched questions:', data.questions);
            setQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
    };

    const startQuiz = () => {
        setStarted(true);
    };

    const handleSelect = (questionIndex, selectedOption) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedOption
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const submitQuiz = () => {
        let calculatedScore = 0;
        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        endQuiz();
    };

    const endQuiz = () => {
        setStarted(false);
        alert(`Quiz over! Your score is ${score}/${questions.length}`);
    };

    return (
        <div className="quiz-container">
            {!started ? (
                <Instructions onStart={startQuiz} />
            ) : (
                <>
                    <div className="quiz-header">
                        <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
                        <div className="score">Score: {score}</div>
                    </div>
                    {currentQuestionIndex < questions.length ? (
                        <>
                            <Question
                                question={questions[currentQuestionIndex].question}
                                options={questions[currentQuestionIndex].options}
                                onSelect={(selectedOption) => handleSelect(currentQuestionIndex, selectedOption)}
                                questionNumber={currentQuestionIndex + 1}
                            />
                            <div className="navigation-buttons">
                                {currentQuestionIndex > 0 && (
                                    <button onClick={handlePreviousQuestion} className="btn-secondary">
                                        Previous
                                    </button>
                                )}
                                <button onClick={handleNextQuestion} className="btn-primary">
                                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="result">
                            <h1>Quiz Completed</h1>
                            <p>Your score: {score} / {questions.length}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Quiz;
