import express from 'express';
import cors from 'cors';
import "dotenv/config";
import quizRoutes from './routes/quizRoutes.js';
import addQuizRoutes from './routes/addQuizRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use('/api', quizRoutes);
app.use('/api/quiz/add', addQuizRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
