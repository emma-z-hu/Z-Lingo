import { Router } from 'express';
import fs from 'fs/promises';

const router = Router();

// Add a new quiz question
router.post('/quiz', async (req, res) => {
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

export default router;
