import React from 'react';
import './HomePage.scss';
import DifficultyCard from '../../components/DifficultyCard/DifficultyCard';
import PrimaryCTA from '../../components/PrimaryCTA/PrimaryCTA';
import SecondaryCTA from '../../components/SecondaryCTA/SecondaryCTA';
import bikeIcon from '../../assets/icons/bike-icon.png';
import planeIcon from '../../assets/icons/plane-icon.png';
import rocketIcon from '../../assets/icons/rocket-icon.png';

const HomePage = () => {
  const handleStartQuiz = () => {
    console.log('Start Quiz button clicked');
  };

  const handleAddQuestion = () => {
    console.log('Add Question button clicked');
  };

  return (
    <div className="home-page">
      <h1 className="home-page__title">Z-Lingo</h1>
      <p className="home-page__subtitle">
        Can you slay that GenZ lingo like a total boss? Take this dope quiz to flex your slang knowledge, fam!
      </p>

      <h2 className="home-page__difficulty-title">Select a difficulty</h2>

      <div className="home-page__difficulty-cards">
        <DifficultyCard icon={bikeIcon} label="Easy" onClick={() => console.log('Easy clicked')} />
        <DifficultyCard icon={planeIcon} label="Intermediate" onClick={() => console.log('Intermediate clicked')} />
        <DifficultyCard icon={rocketIcon} label="Advanced" onClick={() => console.log('Advanced clicked')} />
      </div>

      <PrimaryCTA label="Start quiz" onClick={handleStartQuiz} />
      <SecondaryCTA label="Add a question" onClick={handleAddQuestion} />
    </div>
  );
};

export default HomePage;
