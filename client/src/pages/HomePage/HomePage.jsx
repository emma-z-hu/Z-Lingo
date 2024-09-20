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
  const [nicknameError, setNicknameError] = useState(''); 
  const [difficultyError, setDifficultyError] = useState(''); 
  const navigate = useNavigate();

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    if (difficultyError) setDifficultyError(''); 
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    if (nicknameError) setNicknameError(''); 
  };

  const handleStartQuiz = () => {
    let isError = false;

    if (!nickname.trim()) {
      setNicknameError('Enter your nickname to start the quiz.');
      isError = true;
    }

    if (!difficulty) {
      setDifficultyError('Select a difficulty level to start the quiz.');
      isError = true;
    }

    if (!isError) {
      navigate(`/quiz?difficulty=${difficulty}&nickname=${encodeURIComponent(nickname)}`); 
    }
  };


  const handleSeeLeaderboard = () => {
    if (difficulty) {
      navigate(`/leaderboard?difficulty=${difficulty}`); 
    } else {
      setDifficultyError('Select a difficulty level to see the leaderboard.');
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
        onChange={handleNicknameChange}
        placeholder="What’s your name, cap?"
      />
      {nicknameError && <p className="home-page__error home-page__error--nickname">{nicknameError}</p>} 

      <h2 className="home-page__difficulty-title">Select a difficulty</h2>

      <div className="home-page__difficulty-cards">
        <DifficultyCard
          icon={easyIcon}
          label="Easy"
          selected={difficulty === 'Easy'} 
          onClick={() => handleDifficultySelect('Easy')}
        />
        <DifficultyCard
          icon={intermediateIcon}
          label="Intermediate"
          selected={difficulty === 'Intermediate'}  
          onClick={() => handleDifficultySelect('Intermediate')}
        />
        <DifficultyCard
          icon={advancedIcon}
          label="Advanced"
          selected={difficulty === 'Advanced'}  
          onClick={() => handleDifficultySelect('Advanced')}
        />
      </div>
      {difficultyError && <p className="home-page__error home-page__error--difficulty">{difficultyError}</p>}

      <div className="home-page__cta">
        <PrimaryCTA label="Start Quiz" onClick={handleStartQuiz} />
        <SecondaryCTA label="See Leaderboard" onClick={handleSeeLeaderboard} /> 
        <SecondaryCTA label="Add a Question" onClick={handleAddQuestion} />
      </div>
    </div>
  );
};

export default HomePage;
