import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./LeaderboardPage.scss";
import SecondaryCTA from "../../components/SecondaryCTA/SecondaryCTA";

const API_URL = import.meta.env.VITE_URL;

const LeaderboardPage = () => {
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const difficulty = searchParams.get("difficulty");

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/leaderboard?difficulty=${difficulty}`)
      .then((response) => {
        setLeaderboard(response.data.leaderboard);
      })
      .catch((error) => {
        console.error("Failed to fetch leaderboard data:", error);
      });
  }, [difficulty]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-page__title">
        <h2 className="leaderboard-page__title--h2">🏆 Leaderboard 🏆 </h2>
        <h3 className="leaderboard-page__title--h3">Level: {difficulty} </h3>
      </div>
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
      <div className="leaderboard-page__cta">
        <SecondaryCTA label="Back to Home page" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
