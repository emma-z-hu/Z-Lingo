import fs from 'fs/promises';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5500;


// Fetch 10 random questions by difficulty
app.get('/api/quiz', async (req, res) => {
  const { difficulty } = req.query;

  if (!difficulty || !['Easy', 'Intermediate', 'Advanced'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty level' });
  }

  try {
    const data = await fs.readFile('./data/quiz.json', 'utf8');
    const questions = JSON.parse(data).filter(q => q.difficulty === difficulty);

    if (questions.length < 10) {
      return res.status(400).json({ error: 'Not enough questions available for this difficulty' });
    }

    const randomQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    res.status(200).json({ questions: randomQuestions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});
