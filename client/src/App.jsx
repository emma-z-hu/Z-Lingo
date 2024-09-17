import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import QuizPage from "./pages/QuizPage/QuizPage";
// import QuizResultPage from './pages/QuizResultPage/QuizResultPage';
// import AddQuizPage from './pages/AddQuizPage/AddQuizPage';
// import QuizAddedPage from './pages/QuizAddedPage/QuizAddedPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import "./App.scss";

function App() {
    const [selectedLevel, setSelectedLevel] = useState(null);
  
    return (
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={<HomePage setSelectedLevel={setSelectedLevel} />} 
          />
  
          {/* Quiz Page, passes the selected difficulty level */}
          <Route 
            path="/quiz" 
            element={<QuizPage selectedLevel={selectedLevel} />} 
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;