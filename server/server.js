import fs from 'fs/promises';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

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

// Submit answers, calculate score, and save to score.json
app.post('/api/quiz/submit', async (req, res) => {
    const { answers } = req.body;
  
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }
  
    try {
      // Load quiz questions
      const quizData = await fs.readFile('./data/quiz.json', 'utf8');
      const questions = JSON.parse(quizData);
  
      let score = 0;
  
      // Calculate the score based on user answers
      answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question && question.correctOption === answer.selectedOption) {
          score += 1;
        }
      });
  
      // Load comments based on score
      const commentsData = await fs.readFile('./data/comments.json', 'utf8');
      const commentsList = JSON.parse(commentsData);
      const result = commentsList.find(comment => comment.score === score);
  
      // Load historical scores from score.json
      const scoreData = await fs.readFile('./data/score.json', 'utf8');
      const scores = JSON.parse(scoreData);
  
      // Save the user's score to score.json
      const newScoreEntry = {
        id: uuidv4(),  // Generate random UUID for score entry
        score: score
      };
      scores.push(newScoreEntry);
  
      // Write the updated scores back to score.json
      await fs.writeFile('./data/score.json', JSON.stringify(scores, null, 2), 'utf8');
  
      // Calculate the percentile
      const totalScores = scores.length;
      const scoresLessThanCurrent = scores.filter(s => s.score < score).length;
      const percentile = Math.floor((scoresLessThanCurrent / totalScores) * 100);
  
      // Prepare response
      const response = {
        score: score,
        comment: result.comment,
        meme: result.meme,
        percentile: percentile
      };
  
      // Send the response
      res.status(200).json(response);
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

  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));