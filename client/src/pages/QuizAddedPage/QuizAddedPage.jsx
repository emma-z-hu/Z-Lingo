import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import './QuizAddedPage.scss';

const QuizAddedPage = () => {
  const navigate = useNavigate();

  const handleAddAnotherQuiz = () => {
    navigate('/quiz/add');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="quiz-added-page">
      <h1 className="quiz-added-page__title">Quiz Successfully Added!</h1>
      <p className="quiz-added-page__message">
        Your quiz has been successfully added to the database. You can add another quiz or return to the home page.
      </p>

      <div className="quiz-added-page__cta">
        <PrimaryCTA label="Add another quiz" onClick={handleAddAnotherQuiz} />
        <SecondaryCTA label="Back to Home page" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default QuizAddedPage;
