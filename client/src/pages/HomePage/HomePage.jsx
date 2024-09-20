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
  const [nicknameError, setNicknameError] = useState(''); // Nickname error state
  const [difficultyError, setDifficultyError] = useState(''); // Difficulty error state
  const navigate = useNavigate();

  // Handle difficulty selection
  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    if (difficultyError) setDifficultyError(''); // Clear difficulty error when selected
  };

  // Handle nickname change
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    if (nicknameError) setNicknameError(''); // Clear nickname error when entered
  };

  // Handle Start Quiz click
  const handleStartQuiz = () => {
    let isError = false;

    if (!nickname.trim()) {
      setNicknameError('Please enter your nickname to start the quiz.');
      isError = true;
    }

    if (!difficulty) {
      setDifficultyError('You need to select a difficulty level first to start the quiz.');
      isError = true;
    }

    if (!isError) {
      navigate(`/quiz?difficulty=${difficulty}&nickname=${encodeURIComponent(nickname)}`); // Navigate to QuizPage with query parameter
    }
  };

  // Handle See Leaderboard click
  const handleSeeLeaderboard = () => {
    if (difficulty) {
      navigate(`/leaderboard?difficulty=${difficulty}`); // Navigate to LeaderboardPage with difficulty parameter
    } else {
      setDifficultyError('You need to select a difficulty level first to see the leaderboard.');
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
      {nicknameError && <p className="home-page__error home-page__error--nickname">{nicknameError}</p>} {/* Nickname error */}

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
      {difficultyError && <p className="home-page__error home-page__error--difficulty">{difficultyError}</p>} {/* Difficulty error */}

      <div className="home-page__cta">
        <PrimaryCTA label="Start quiz" onClick={handleStartQuiz} />
        <PrimaryCTA label="See Leaderboard" onClick={handleSeeLeaderboard} /> {/* New CTA for See Leaderboard */}
        <SecondaryCTA label="Add a question" onClick={handleAddQuestion} />
      </div>
    </div>
  );
};

export default HomePage;
