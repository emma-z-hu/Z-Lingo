import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import './QuizResultPage.scss';

import score0 from '../../assets/images/score-0.webp';
import score1 from '../../assets/images/score-1.webp';
import score2 from '../../assets/images/score-2.webp';
import score3 from '../../assets/images/score-3.webp';
import score4 from '../../assets/images/score-4.webp';
import score5 from '../../assets/images/score-5.webp';
import score6 from '../../assets/images/score-6.webp';
import score7 from '../../assets/images/score-7.webp';
import score8 from '../../assets/images/score-8.webp';
import score9 from '../../assets/images/score-9.webp';
import score10 from '../../assets/images/score-10.webp';

const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const score = searchParams.get('score');
  const comment = searchParams.get('comment');
  const percentile = searchParams.get('percentile');
  const difficulty = searchParams.get('difficulty'); 
  const nickname = searchParams.get('nickname'); 


  const scoreImages = {
    0: score0,
    1: score1,
    2: score2,
    3: score3,
    4: score4,
    5: score5,
    6: score6,
    7: score7,
    8: score8,
    9: score9,
    10: score10,
  };

  const handleStartAnotherQuiz = () => {
    navigate(`/quiz?difficulty=${difficulty}&nickname=${encodeURIComponent(nickname)}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLeaderboard = () => {
    navigate(`/leaderboard?difficulty=${difficulty}`);
  };

  return (
    <div className="quiz-result-page">
      <h1 className="quiz-result-page__title">{nickname}, you scored {score}/10</h1>
      <p className="quiz-result-page__percentile">You scored higher than {percentile}% of participants!</p>

      <PrimaryCTA label="See Leaderboard" onClick={handleLeaderboard} /> 

      <p className="quiz-result-page__comment">{decodeURIComponent(comment)}</p>
      <img className="quiz-result-page__meme" src={scoreImages[score]} alt={`Score ${score} Meme`} />

      <div className="quiz-result-page__cta">
        <PrimaryCTA label="Start another quiz" onClick={handleStartAnotherQuiz} />
        <SecondaryCTA label="Back to Home page" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default QuizResultPage;
