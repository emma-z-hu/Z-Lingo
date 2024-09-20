import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './LeaderboardPage.scss';

const API_URL = import.meta.env.VITE_URL;

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get('difficulty');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/leaderboard?difficulty=${difficulty}`)
      .then((response) => {
        setLeaderboard(response.data.leaderboard);
      })
      .catch((error) => {
        console.error('Failed to fetch leaderboard data:', error);
      });
  }, [difficulty]);

  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-page__title">Leaderboard - {difficulty}</h1>
      <table className="leaderboard-page__table">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Difficulty</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.difficulty}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
