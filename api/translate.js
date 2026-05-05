const OpenAI = require('openai');

let openai = null;

function getOpenAIClient() {
  if (!openai) {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY is not configured');
    }
    openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
      timeout: 30000,
    });
  }
  return openai;
}

const SYSTEM_PROMPT = `You are a helpful assistant that converts informal Chinese descriptions or awkward English phrases into natural, idiomatic English expressions.

Your task is to analyze the user's input and provide:
1. Three different tone expressions (Casual, Daily, Emotional)
2. Replacement suggestions for key phrases with usage notes

Input types you might receive:
- Chinese scene descriptions (e.g., "我想表达我很开心")
- Unnatural English phrases (e.g., "I am very happy to meet you")

Output Format (JSON):
{
  "expressions": [
    {
      "tone": "Casual",
      "expression": "A natural, informal English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    },
    {
      "tone": "Daily",
      "expression": "An everyday, conversational English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    },
    {
      "tone": "Emotional",
      "expression": "An expressive, emotion-filled English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    }
  ],
  "tips": [
    {
      "original": "The awkward or literal phrase from input",
      "replacement": "A more natural alternative",
      "explanation": "Brief explanation of why this is more natural",
      "usage_note": "Short Chinese note on when to use this phrase"
    }
  ]
}

Rules:
- Always output valid JSON
- Keep expressions concise (under 100 characters each)
- Provide 1-2 tips max
- Each tip must have usage_note in Chinese
- Use "json_object" response format`;

async function getTranslation(input) {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: input },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({ error: 'Text cannot be empty' });
    }

    if (text.length > 500) {
      return res.status(400).json({ error: 'Text exceeds maximum length of 500 characters' });
    }

    const result = await getTranslation(text);
    res.status(200).json(result);
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
};
