import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MultipleChoiceOption from '../../components/MultipleChoiceOption/MultipleChoiceOption';
import './QuizPage.scss';
import axios from 'axios';  // For making HTTP requests to the backend
import { useSearchParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [searchParams] = useSearchParams();  // Hook to get query parameters
  const navigate = useNavigate();

  // Get the difficulty level from query params
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    // Fetch questions from the backend based on selected difficulty level
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`/api/quiz?difficulty=${difficulty}`);
        if (response.data.questions.length > 0) {
          setQuestions(response.data.questions);
        } else {
          console.error("No questions available.");
          setQuestions([]); // Handle no questions returned
        }
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      }
    };

    if (difficulty) {
      fetchQuizQuestions();
    }
  }, [difficulty]);

  // Handle user selecting an option
  const handleOptionSelect = (selectedOption) => {
    if (isAnswered) return; // Prevent selecting multiple options at once

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOption;

    setSelectedAnswer(selectedOption);
    setCorrectAnswer(currentQuestion.correctOption);
    setIsAnswered(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setCorrectAnswer(null);
        setIsAnswered(false);
      } else {
        navigate('/quiz/result'); // Navigate to the quiz result page after the last question
      }
    }, 2000);
  };

  // Safeguard in case no questions are fetched
  if (questions.length === 0) return <div>No questions available.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <Header level={difficulty} />
      <img src={currentQuestion.image} alt={currentQuestion.question} className="quiz-page__image" />
      <h2 className="quiz-page__question">{currentQuestion.question}</h2>

      <div className="quiz-page__options">
        {currentQuestion.options.map((option, index) => (
          <MultipleChoiceOption
            key={index}
            option={option}
            isSelected={option === selectedAnswer}
            isCorrect={option === correctAnswer}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>

      <Footer currentQuestion={currentQuestionIndex + 1} />
    </div>
  );
};

export default QuizPage;
