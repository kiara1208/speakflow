const express = require('express');
const router = express.Router();
const { getTranslation } = require('../services/openaiService');

router.post('/', async (req, res) => {
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
    res.json(result);
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

module.exports = router;
