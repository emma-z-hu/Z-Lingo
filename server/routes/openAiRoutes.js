import { Router } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

router.post('/get-trick-answers', async (req, res) => {
  const { slangWord } = req.body;

  if (!slangWord) {
    return res.status(400).json({ error: 'Slang word is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `The slang word is "${slangWord}". Provide three incorrect meanings for this slang word. In your response, only inlcude the three options, no other content.`,
        },
      ],
    });

    const rawAnswers = response.choices[0].message.content.trim().split('\n');
    const trickAnswers = rawAnswers
      .map(answer => answer.replace(/^\d+\.\s*/, '').trim())
      .filter(answer => answer.length > 0); 

    res.status(200).json({ trickAnswers });
  } catch (error) {
    console.error('Error generating trick answers:', error);
    res.status(500).json({ error: 'Failed to generate trick answers' });
  }
});

export default router;
