import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MultipleChoiceOption from '../../components/MultipleChoiceOption/MultipleChoiceOption';
import Header from '../../components/Header/Header';

import axios from 'axios';
import './QuizPage.scss';

const API_URL = import.meta.env.VITE_URL;

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/quiz?difficulty=${difficulty}`)
      .then((response) => {
        console.log('Fetched questions:', response.data.questions); // Debugging - TBD
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
    }, 2000); 
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <Header difficulty={difficulty} />

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
