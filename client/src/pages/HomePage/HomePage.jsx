import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import DifficultyCard from '../../components/DifficultyCard/DifficultyCard';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import bikeIcon from '../../assets/icons/bike-icon.png';
import planeIcon from '../../assets/icons/plane-icon.png';
import rocketIcon from '../../assets/icons/rocket-icon.png';

const HomePage = ({ setSelectedLevel }) => {
  const [difficulty, setDifficulty] = useState(null);
  const navigate = useNavigate();

  // Function to handle difficulty selection
  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setSelectedLevel(level);  // Update selected level in App.js
  };

  // Handle "Start Quiz" button click
  const handleStartQuiz = () => {
    if (difficulty) {
      navigate('/quiz');  // Navigate to QuizPage
    } else {
      alert('Please select a difficulty level to start the quiz.');
    }
  };

  const handleAddQuestion = () => {
    console.log('Add Question button clicked');
  };

  return (
    <div className="home-page">
      <h1 className="home-page__title">Z-Lingo</h1>
      <p className="home-page__subtitle">
        Can you slay that GenZ lingo like a total boss? Take this dope quiz to flex your slang knowledge!
      </p>

      <h2 className="home-page__difficulty-title">Select a difficulty</h2>

      <div className="home-page__difficulty-cards">
        <DifficultyCard icon={bikeIcon} label="Easy" onClick={() => handleDifficultySelect('Easy')} />
        <DifficultyCard icon={planeIcon} label="Intermediate" onClick={() => handleDifficultySelect('Intermediate')} />
        <DifficultyCard icon={rocketIcon} label="Advanced" onClick={() => handleDifficultySelect('Advanced')} />
      </div>

      <div className="home-page__cta">
        <PrimaryCTA label="Start quiz" onClick={handleStartQuiz} />
        <SecondaryCTA label="Add a question" onClick={handleAddQuestion} />
      </div>
    </div>
  );
};

export default HomePage;
