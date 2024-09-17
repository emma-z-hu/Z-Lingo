import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.scss';
import MultipleChoiceOption from '../../components/MultipleChoiceOption/MultipleChoiceOption';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get difficulty level from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    // Fetch questions from backend based on difficulty
    axios
      .get(`/api/quiz?difficulty=${difficulty}`)
      .then((response) => {
        setQuestions(response.data.questions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch quiz questions:', error);
        setIsLoading(false);
      });
  }, [difficulty]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.correctOption) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        navigate(`/quiz/result?score=${score}`);
      }
      setSelectedOption(null);
      setIsCorrect(null);
    }, 2000); // 2-second delay to move to next question
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p>No questions available for this difficulty.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <h1 className="quiz-page__question">{currentQuestion.question}</h1>
      <div className="quiz-page__options">
        {currentQuestion.options.map((option) => (
          <MultipleChoiceOption
            key={option}
            label={option}
            isSelected={selectedOption === option}
            isCorrect={isCorrect !== null && option === currentQuestion.correctOption}
            isIncorrect={isCorrect === false && option === selectedOption}
            onClick={() => handleOptionSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
