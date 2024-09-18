import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import './QuizResultPage.scss';

const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const score = searchParams.get('score');
  const comment = searchParams.get('comment');
  const meme = searchParams.get('meme');
  const percentile = searchParams.get('percentile');
  const difficulty = searchParams.get('difficulty'); 

  const handleStartAnotherQuiz = () => {
    navigate(`/quiz?difficulty=${difficulty}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="quiz-result-page">
      <h1 className="quiz-result-page__title">Your Score: {score}/10</h1>
      <p className="quiz-result-page__percentile">You scored higher than {percentile}% of participants!</p>

      <p className="quiz-result-page__comment">{decodeURIComponent(comment)}</p>
      <img className="quiz-result-page__meme" src={decodeURIComponent(meme)} alt="Meme" />

      <div className="quiz-result-page__cta">
        <PrimaryCTA label="Start another quiz" onClick={handleStartAnotherQuiz} />
        <SecondaryCTA label="Back to Home page" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default QuizResultPage;
