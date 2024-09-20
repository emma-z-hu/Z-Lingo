import { Router } from 'express';
import fs from 'fs/promises';

const router = Router();

// Fetch 10 random questions by difficulty
router.get('/quiz', async (req, res) => {
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

// Submit answers, calculate score, save to score.json, and calculate percentile
router.post('/quiz/submit', async (req, res) => {
  const { answers, difficulty, username } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid answers format' });
  }

  if (!difficulty || !['Easy', 'Intermediate', 'Advanced'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty level' });
  }

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing username' });
  }

  try {
    const quizData = await fs.readFile('./data/quiz.json', 'utf8');
    const questions = JSON.parse(quizData).filter(q => q.difficulty === difficulty);

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

    // Load historical scores from score.json and filter by difficulty
    const scoreData = await fs.readFile('./data/score.json', 'utf8');
    const scores = JSON.parse(scoreData).filter(s => s.difficulty === difficulty);

    // Save the user's score to score.json
    const newScoreEntry = {
      username: username, // Add username to the score entry
      difficulty: difficulty,
      score: score
    };

    const fullScoreList = JSON.parse(await fs.readFile('./data/score.json', 'utf8'));
    fullScoreList.push(newScoreEntry);
    await fs.writeFile('./data/score.json', JSON.stringify(fullScoreList, null, 2), 'utf8');

    // Calculate the percentile
    const totalScores = scores.length;
    const scoresLessThanCurrent = scores.filter(s => s.score < score).length;
    const percentile = Math.floor((scoresLessThanCurrent / totalScores) * 100);

    const response = {
      score: score,
      comment: result.comment,
      percentile: percentile
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit answers and calculate score' });
  }
});

export default router;
