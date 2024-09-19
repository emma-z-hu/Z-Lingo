import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MultipleChoiceOption from '../../components/MultipleChoiceOption/MultipleChoiceOption';
import Header from '../../components/Header/Header';
import QuestionCount from '../../components/QuestionCount/QuestionCount';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import './QuizPage.scss';

const API_URL = import.meta.env.VITE_URL;

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);  // Track user's answers
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/quiz?difficulty=${difficulty}`)
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
    const currentQuestion = questions[currentQuestionIndex];
    
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: currentQuestion.id, selectedOption: option }
    ]);

    setSelectedOption(option);
    if (option === currentQuestion.correctOption) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsTransitioning(true);
    }, 500);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        submitQuiz();
      }
      setSelectedOption(null);
      setIsCorrect(null);
      setIsTransitioning(false);
    }, 1000);
  };

  const submitQuiz = () => {
    axios
      .post(`${API_URL}/api/quiz/submit`, { answers, difficulty })
      .then((response) => {
        const { score, comment, meme, percentile } = response.data;
        navigate(`/quiz/result?score=${score}&comment=${encodeURIComponent(comment)}&meme=${encodeURIComponent(meme)}&percentile=${percentile}&difficulty=${difficulty}`);
      })
      .catch((error) => {
        console.error('Failed to submit quiz:', error);
      });
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <Header difficulty={difficulty} />
      
      {isTransitioning && <Spinner />}
      
        <div className="quiz-page__main">
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
        <QuestionCount currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
        </div>
  );
};

export default QuizPage;
