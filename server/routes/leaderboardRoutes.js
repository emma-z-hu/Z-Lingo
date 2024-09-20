import { Router } from 'express';
import fs from 'fs/promises';

const router = Router();

// GET leaderboard data based on difficulty level
router.get('/', async (req, res) => {
  const { difficulty } = req.query;

  // Validate difficulty query parameter
  if (!difficulty || !['Easy', 'Intermediate', 'Advanced'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid or missing difficulty level' });
  }

  try {
    // Read the score data from score.json
    const scoreData = await fs.readFile('./data/score.json', 'utf8');
    const scores = JSON.parse(scoreData);

    // Filter scores based on difficulty level
    const filteredScores = scores.filter(score => score.difficulty === difficulty);

    // Sort scores in descending order, then get top 10
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
