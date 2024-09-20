import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import QuizPage from "./pages/QuizPage/QuizPage";
import QuizResultPage from './pages/QuizResultPage/QuizResultPage';
import AddQuizPage from './pages/AddQuizPage/AddQuizPage';
import QuizAddedPage from './pages/QuizAddedPage/QuizAddedPage';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage'; 
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer'; 

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/result" element={<QuizResultPage />} />
        <Route path="/quiz/add" element={<AddQuizPage />} />
        <Route path="/quiz/add/complete" element={<QuizAddedPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} /> 
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
