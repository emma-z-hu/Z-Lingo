import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MultipleChoiceOption from '../../components/MultipleChoiceOption/MultipleChoiceOption';
import './QuizPage.scss';
import axios from 'axios';  // For making HTTP requests to the backend

const QuizPage = ({ selectedLevel }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch questions from the backend based on selected difficulty level
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`/api/quiz?difficulty=${selectedLevel}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      }
    };

    fetchQuizQuestions();
  }, [selectedLevel]);

  // Handle user selecting an option
  const handleOptionSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
    // Add logic to check if the answer is correct, then move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <Header level={selectedLevel} />
      <img src={currentQuestion.image} alt={currentQuestion.question} className="quiz-page__image" />
      <h2 className="quiz-page__question">{currentQuestion.question}</h2>

      <div className="quiz-page__options">
        {currentQuestion.options.map((option, index) => (
          <MultipleChoiceOption key={index} option={option} onSelect={handleOptionSelect} />
        ))}
      </div>

      <Footer currentQuestion={currentQuestionIndex + 1} />
    </div>
  );
};

export default QuizPage;
