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

// Submit user answers and get the score
app.post('/api/quiz/submit', async (req, res) => {
    const { answers } = req.body;
  
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }
  
    try {
      const data = await fs.readFile('./data/quiz.json', 'utf8');
      const questions = JSON.parse(data);
  
      let score = 0;
  
      // Calculate the score
      answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question && question.correctOption === answer.selectedOption) {
          score += 1;
        }
      });
  
      const scoreData = await fs.readFile('./data/score.json', 'utf8');
      const scoreList = JSON.parse(scoreData);
      const result = scoreList.find(s => s.score === score);
  
      res.status(200).json({
        score: score,
        comment: result.comment,
        meme: result.meme,
        percentile: Math.floor(Math.random() * 100) // Dummy percentile value - need an actual calc later
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit answers and calculate score' });
    }
  });

//Add a new quiz question
  app.post('/api/quiz', async (req, res) => {
    const { slang, question, options, correctOption, difficulty } = req.body;
  
    if (!slang || !question || !options || !correctOption || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const validDifficulties = ['Easy', 'Intermediate', 'Advanced'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level' });
    }
  
    try {
      const data = await fs.readFile('./data/quiz.json', 'utf8');
      const questions = JSON.parse(data);
  
      const newQuestion = {
        id: questions.length + 1,
        slang,
        question,
        options,
        correctOption,
        difficulty
      };
  
      questions.push(newQuestion);
  
      await fs.writeFile('./data/quiz.json', JSON.stringify(questions, null, 2), 'utf8');
      res.status(201).json({ message: 'New question added successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add new quiz question' });
    }
  });

//Get the leaderboard percentile for a score
  app.get('/api/leaderboard', (req, res) => {
    const { score } = req.query;
  
    if (!score || isNaN(score)) {
      return res.status(400).json({ error: 'Invalid or missing score' });
    }
  
    // Dummy percentile value - need an actual calc later
    const percentile = Math.floor(Math.random() * 100);
    res.status(200).json({ percentile });
  });
  

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));