import express from 'express';
import cors from 'cors';
import "dotenv/config";
import quizRoutes from './routes/quizRoutes.js';
import addQuizRoutes from './routes/addQuizRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import openAiRoutes from './routes/openAiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use('/api', quizRoutes);
app.use('/api/quiz/add', addQuizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/openai', openAiRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
