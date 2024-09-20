import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import DifficultyCard from '../../components/DifficultyCard/DifficultyCard';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import InputField from '../../components/InputField/InputField';
import easyIcon from '../../assets/icons/easy-icon.png';
import intermediateIcon from '../../assets/icons/intermediate-icon.png';
import advancedIcon from '../../assets/icons/advanced-icon.png';

const HomePage = () => {
  const [nickname, setNickname] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setError('');  
  };

  const handleStartQuiz = () => {
    if (!nickname.trim()) {
      setError('Please enter your nickname to start the quiz.');
      return;
    }
    if (difficulty) {
      navigate(`/quiz?difficulty=${difficulty}&nickname=${encodeURIComponent(nickname)}`);  // Navigate to QuizPage with query parameter
    } else {
      setError('You need to select a difficulty level first to start the quiz.');
      const startQuizButton = document.querySelector('.primary-cta');
      startQuizButton.classList.add('shake');
      setTimeout(() => {
        startQuizButton.classList.remove('shake');
      }, 500);
    }
  };

  const handleSeeLeaderboard = () => {
    if (difficulty) {
      navigate(`/leaderboard?difficulty=${difficulty}`);  // Navigate to LeaderboardPage with difficulty parameter
    } else {
      setError('You need to select a difficulty level first to see the leaderboard.');
    }
  };

  const handleAddQuestion = () => {
    navigate('/quiz/add');
  };

  return (
    <div className="home-page">
      <h1 className="home-page__title">Z-Lingo</h1>
      <p className="home-page__subtitle">
        Can you slay that GenZ lingo like a total boss? Take this dope quiz to flex your slang knowledge!
      </p>

      <h2 className="home-page__nickname-title">Nickname</h2>
      <InputField
        className="home-page__nickname-input"
        label=""
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="What’s your name, cap?"
      />
      {error && <p className="home-page__error">{error}</p>} 


      <h2 className="home-page__difficulty-title">Select a difficulty</h2>

      <div className="home-page__difficulty-cards">
        <DifficultyCard
          icon={easyIcon}
          label="Easy"
          selected={difficulty === 'Easy'}  // Pass selected state
          onClick={() => handleDifficultySelect('Easy')}
        />
        <DifficultyCard
          icon={intermediateIcon}
          label="Intermediate"
          selected={difficulty === 'Intermediate'}  // Pass selected state
          onClick={() => handleDifficultySelect('Intermediate')}
        />
        <DifficultyCard
          icon={advancedIcon}
          label="Advanced"
          selected={difficulty === 'Advanced'}  // Pass selected state
          onClick={() => handleDifficultySelect('Advanced')}
        />
      </div>

      {error && <p className="home-page__error">{error}</p>}  {/* Display error if no difficulty selected */}

      <div className="home-page__cta">
        <PrimaryCTA label="Start quiz" onClick={handleStartQuiz} />
        <SecondaryCTA label="See Leaderboard" onClick={handleSeeLeaderboard} /> {/* New CTA for See Leaderboard */}
        <SecondaryCTA label="Add a question" onClick={handleAddQuestion} />
      </div>
    </div>
  );
};

export default HomePage;
