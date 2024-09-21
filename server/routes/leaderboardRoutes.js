import { Router } from 'express';
import fs from 'fs/promises';

const router = Router();

router.get('/', async (req, res) => {
  const { difficulty } = req.query;

  if (!difficulty || !['Easy', 'Intermediate', 'Advanced'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty level' });
  }

  try {
    const scoreData = await fs.readFile('./data/score.json', 'utf8');
    const scores = JSON.parse(scoreData);

    const filteredScores = scores.filter(score => score.difficulty === difficulty);

    const topScores = filteredScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.status(200).json({ leaderboard: topScores });
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

export default router;
