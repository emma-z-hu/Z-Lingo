import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import ThankYouImage from '../../assets/images/you-rock.webp';
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
      <img 
        src={ThankYouImage}
        alt="You Rock Cute Dog" 
        className="quiz-added-page__image"
      />
      <div className="quiz-added-page__cta">
        <PrimaryCTA label="Add another quiz" onClick={handleAddAnotherQuiz} />
        <SecondaryCTA label="Back to Home page" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default QuizAddedPage;
